import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { UserContextService } from 'openai-whatsapp/user-context/user-context.service';

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
      const userContext = await this.context.getConsersationHistory(userID);
      this.logger.log(userContext);

      const response = await this.openai.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt || '' },
          ...(userContext || []),
        ],
        model: 'gpt-3.5-turbo',
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
