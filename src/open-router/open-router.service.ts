import { Injectable, Logger } from '@nestjs/common';
import { UserContextService } from 'openai-whatsapp/user-context/user-context.service';
import axios from 'axios';

@Injectable()
export class OpenRouterService {
  constructor(private readonly context: UserContextService) {}

  private readonly logger = new Logger(OpenRouterService.name);

  async generateAIResponse(userMessage: string): Promise<string> {
    try {
      const systemMessage = process.env.LUMA_SYSTEM_PROMPT;

      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'openai/gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: systemMessage,
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

      return response.data.choices[0].message.content;
    } catch (error) {
      console.log(error);

      this.logger.error('Erro ao gerar resposta da IA via OpenRouter:', error);
      throw error;
    }
  }
}
