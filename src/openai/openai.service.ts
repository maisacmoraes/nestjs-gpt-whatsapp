import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat';
import { UserContextService } from 'src/user-context/user-context.service';

@Injectable()
export class OpenaiService {
  constructor(private readonly context: UserContextService) {}
  private readonly openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  private readonly logger = new Logger(OpenaiService.name);

  async generateAIResponse(userID: string, prompt: string): Promise<string> {
    try {
      const systemPrompt = process.env.LUMA_SYSTEM_PROMPT;

      await this.context.saveToContext(prompt, 'user', userID);
      const userContext = (await this.context.getConsersationHistory(
        userID,
      )) as ChatCompletionMessageParam[];
      this.logger.log(userContext);

      const response = await this.openai.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt || '' },
          ...(userContext || []),
        ],
        model: process.env.OPENAI_MODEL || 'gpt-4o-2024-11-20',
      });

      const aiResponse = response.choices[0].message?.content || '';

      await this.context.saveAndFetchContext(aiResponse, 'assistant', userID);

      this.logger.log('Response generated successfully:', aiResponse);
      return aiResponse;
    } catch (error) {
      this.logger.error('Error generating response:', error);
      throw new Error('Error generating response');
    }
  }
}
