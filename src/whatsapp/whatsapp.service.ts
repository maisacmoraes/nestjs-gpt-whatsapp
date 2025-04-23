import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class WhatsappService {
  constructor(private readonly httpService: HttpService) {}
  private readonly logger = new Logger(WhatsappService.name);

  async sendWhatsappMessage(to: string): Promise<any> {
    console.log(to);

    const url = `https://graph.facebook.com/v22.0/558150200725850/messages`; // confere se a versão é mesmo v22.0 ou v17.0 (a última pública hoje)

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.WHATSAPP_CLOUD_API_KEY}`,
    };
    console.log(process.env.WHATSAPP_CLOUD_API_KEY);

    const data = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'text',
      text: {
        preview_url: false,
        body: 'Hello from WhatsApp Cloud API!',
      },
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post(url, data, { headers }).pipe(
          map((res: AxiosResponse) => res.data),
          catchError((error) => {
            this.logger.error(
              'Erro ao enviar para WhatsApp API',
              error?.response?.data || error,
            );
            throw new BadRequestException(
              'Erro ao enviar mensagem para WhatsApp API',
            );
          }),
        ),
      );

      this.logger.log('Mensagem enviada com sucesso:', response);
      return response;
    } catch (error) {
      this.logger.error('Erro inesperado ao enviar mensagem:', error);
      return 'error';
    }
  }

  // async sendWhatsappMessage(from) {
  //   console.log(from);

  //   const url = 'https://graph.facebook.com/v22.0/558150200725850/messages';
  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${process.env.WHATSAPP_CLOUD_API_KEY}`,
  //     },
  //   };
  //   const data = JSON.stringify({
  //     messaging_product: 'whatsapp',
  //     recipient_type: 'individual',
  //     to: from,
  //     type: 'text',
  //     text: {
  //       preview_url: false,
  //       body: 'Hello from WhatsApp Cloud API!',
  //     },
  //   });
  //   try {
  //     const response = this.httpService
  //       .post(url, data, config)
  //       .pipe(map((response: AxiosResponse) => response.data))
  //       .pipe(
  //         catchError((error) => {
  //           this.logger.error(error);
  //           throw new BadRequestException(
  //             'Error posting message to WhatsApp API',
  //           );
  //         }),
  //       );

  //     const messageSendingStatus = await lastValueFrom(response);
  //     this.logger.log('Message sent successfully:', messageSendingStatus);
  //   } catch (error) {
  //     this.logger.error(error);
  //     console.error('Unexpected error:', error);
  //     return 'error';
  //   }
  // }
}
