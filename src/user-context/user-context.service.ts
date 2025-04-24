import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import * as crypto from 'crypto';
import { ChatCompletionMessageParam } from 'openai/resources/chat';

@Injectable()
export class UserContextService {
  private readonly redis = new Redis(process.env.REDIS_URL || '');
  private readonly logger = new Logger(UserContextService.name);
  private readonly salt = process.env.HASHING_SALT;
  private readonly contextExpiration = 60 * 60 * 24; // 1 day

  hashPhoneNumber(phoneNumber: string): string {
    const hashedNumber = crypto
      .createHmac('sha256', this.salt || '')
      .update(phoneNumber)
      .digest('hex');
    return hashedNumber;
  }

  async saveToContext(
    context: string,
    contextType: 'user' | 'assistant',
    userID: string,
  ) {
    try {
      const value = JSON.stringify({
        type: contextType,
        data: { content: context },
      });

      const hashedUserID = this.hashPhoneNumber(userID);

      await this.redis.rpush(hashedUserID, value);
      await this.redis.expire(hashedUserID, this.contextExpiration);

      return 'ok';
    } catch (error) {
      this.logger.error('Error saving to context:', error);
      throw new Error('Error saving to context');
    }
  }

  async saveAndFetchContext(
    context: string,
    contextType: 'user' | 'assistant',
    userID: string,
  ): Promise<any[]> {
    try {
      const pipeline = this.redis.pipeline();
      const value = JSON.stringify({
        type: contextType,
        data: { content: context },
      });

      const hashedUserID = this.hashPhoneNumber(userID);

      pipeline.rpush(hashedUserID, value);
      pipeline.lrange(hashedUserID, 0, -1);
      pipeline.expire(hashedUserID, this.contextExpiration);

      const result = await pipeline.exec();
      if (
        !result ||
        !Array.isArray(result) ||
        result.length < 2 ||
        !Array.isArray(result[1])
      ) {
        throw new Error('Invalid Redis pipeline response');
      }
      const history = result[1][1] as string[];

      return history.map(
        (item) => JSON.parse(item) as ChatCompletionMessageParam,
      );
    } catch (error) {
      this.logger.error('Error saving to context:', error);
      throw new Error('Error saving to context');
    }
  }

  async getConsersationHistory(userID: string) {
    try {
      const history = await this.redis.lrange(userID, 0, -1);
      return history.map(
        (item) => JSON.parse(item) as ChatCompletionMessageParam,
      );
    } catch (error) {
      this.logger.error('Error getting conversation history:', error);
      throw new Error('Error getting conversation history');
    }
  }
}
