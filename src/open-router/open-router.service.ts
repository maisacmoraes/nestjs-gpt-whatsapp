import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { UserContextService } from 'src/user-context/user-context.service';

type OpenAIResponse = {
  choices: {
    message: {
      content: string;
    };
  }[];
};
@Injectable()
export class OpenRouterService {
  constructor(private readonly context: UserContextService) {}

  private readonly logger = new Logger(OpenRouterService.name);

  async generateAIResponse(userID: string, userMessage: string) {
    try {
      const systemPrompt = process.env.LUMA_SYSTEM_PROMPT;

      await this.context.saveToContext(userMessage, 'user', userID);
      const userContext = await this.context.getConsersationHistory(userID);
      this.logger.log(userContext);

      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'openai/gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            {
              role: 'user',
              content: userMessage,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'HTTP-Referer': 'https://seusite.com',
            'X-Title': 'whatsapp-bot',
            'Content-Type': 'application/json',
          },
        },
      );

      const aiResponse = (response.data as OpenAIResponse).choices[0].message
        .content;

      console.log(aiResponse);

      await this.context.saveAndFetchContext(aiResponse, 'assistant', userID);
    } catch (error) {
      console.log(error);

      this.logger.error('Erro ao gerar resposta da IA via OpenRouter:', error);
      throw error;
    }
  }
}
