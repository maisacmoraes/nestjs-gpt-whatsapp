import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { OpenaiService } from 'openai-whatsapp/openai/openai.service';

@Injectable()
export class WhatsappService {
  constructor(private readonly openaiService: OpenaiService) {}
  private readonly httpService = new HttpService();
  private readonly logger = new Logger(WhatsappService.name);

  async sendWhatsappMessage(
    to: string,
    userMessage: string,
    message_id: string,
  ) {
    const aiResponse = await this.openaiService.generateAIResponse(
      to,
      userMessage,
    );
    const url = `https://graph.facebook.com/${process.env.WHATSAPP_CLOUD_API_VERSION}/${process.env.WHATSAPP_CLOUD_PHONE_NUMBER_ID}/messages`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.WHATSAPP_CLOUD_API_KEY}`,
    };
    const data = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      // to,/*  */
      context: {
        message_id,
      },
      type: 'text',
      text: {
        preview_url: false,
        body: aiResponse,
      },
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post<unknown>(url, data, { headers }).pipe(
          map((res: AxiosResponse<unknown>) => res.data),
          catchError((error: AxiosError<unknown>) => {
            const errorData = error.response?.data ?? error.message;

            if (typeof errorData === 'object') {
              this.logger.error(
                'Erro ao enviar para WhatsApp API',
                JSON.stringify(errorData),
              );
            } else {
              this.logger.error('Erro ao enviar para WhatsApp API', errorData);
            }

            throw new BadRequestException(
              'Erro ao enviar mensagem para WhatsApp API',
            );
          }),
        ),
      );

      this.logger.log('Mensagem enviada com sucesso:', response);
      return response;
    } catch (error: unknown) {
      this.logger.error('Erro inesperado ao enviar mensagem:', error);
      return 'error';
    }
  }

  async markAsRead(messageId: string): Promise<void> {
    const url = `https://graph.facebook.com/${process.env.WHATSAPP_CLOUD_API_VERSION}/${process.env.WHATSAPP_CLOUD_PHONE_NUMBER_ID}/messages`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.WHATSAPP_CLOUD_API_KEY}`,
    };
    const data = {
      messaging_product: 'whatsapp',
      status: 'read',
      message_id: messageId,
    };

    try {
      await lastValueFrom(
        this.httpService.post<unknown>(url, data, { headers }).pipe(
          map(() => {
            this.logger.log(`Mensagem ${messageId} marcada como lida.`);
          }),
          catchError((error: AxiosError<unknown>) => {
            let errorData: string;

            if (
              error.response?.data &&
              typeof error.response.data === 'object'
            ) {
              errorData = JSON.stringify(error.response.data);
            } else if (typeof error.response?.data === 'string') {
              errorData = error.response.data;
            } else {
              errorData = error.message;
            }

            this.logger.error('Erro ao marcar mensagem como lida:', errorData);
            throw new BadRequestException('Erro ao marcar mensagem como lida');
          }),
        ),
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : JSON.stringify(error);
      this.logger.error(
        'Erro inesperado ao marcar mensagem como lida:',
        errorMessage,
      );
    }
  }
}
