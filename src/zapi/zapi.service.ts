import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import {
  IResponse,
  ISendDocumentRequest,
  ISendLinkRequest,
  ISendSimpleTextRequest,
} from './interfaces';
import { httpResponses } from 'openai-whatsapp/httpResponses';
import { OpenaiService } from 'openai-whatsapp/openai/openai.service';

@Injectable()
export class ZapiService {
  constructor(private readonly openaiService: OpenaiService) {}

  private readonly URL_BASE = `https://api.z-api.io/instances/${process.env.INSTANCE_ZAPI}/token/${process.env.TOKEN_ZAPI}/`;
  private readonly httpService = new HttpService();
  private readonly logger = new Logger(ZapiService.name);
  private readonly delayMessage = 15;
  private readonly delayTyping = 15;
  private readonly delayRequest = 5000;

  formatPhoneNumber(phoneNumber: string): string {
    return phoneNumber.replace(/\D/g, '');
  }

  private async sendSimpleText(
    data: ISendSimpleTextRequest,
  ): Promise<IResponse> {
    try {
      const url = `${this.URL_BASE}send-text`;

      const response = await lastValueFrom(
        this.httpService.post<IResponse>(url, data, {
          headers: {
            'client-token': process.env.CLIENT_TOKEN_ZAPI,
          },
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          httpResponses.GENERAL.UNKNOWN,
          HttpStatus.INTERNAL_SERVER_ERROR,
          { cause: error },
        );
      }
    }
  }

  /* istanbul ignore next */
  private async sendDocument(
    data: ISendDocumentRequest,
    ext: string,
  ): Promise<IResponse> {
    try {
      const url = `${this.URL_BASE}send-document/${ext}`;
      const response = await lastValueFrom(
        this.httpService.post<IResponse>(url, data, {
          headers: {
            'client-token': process.env.CLIENT_TOKEN_ZAPI,
          },
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          httpResponses.GENERAL.UNKNOWN,
          HttpStatus.INTERNAL_SERVER_ERROR,
          { cause: error },
        );
      }
    }
  }

  /* istanbul ignore next */
  private async sendLink(data: ISendLinkRequest): Promise<IResponse> {
    try {
      const url = `${this.URL_BASE}send-link`;
      const response = await lastValueFrom(
        this.httpService.post<IResponse>(url, data, {
          headers: {
            'client-token': process.env.CLIENT_TOKEN_ZAPI,
          },
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          httpResponses.GENERAL.UNKNOWN,
          HttpStatus.INTERNAL_SERVER_ERROR,
          { cause: error },
        );
      }
    }
  }

  /* istanbul ignore next */
  private async sendOptionsList(data: ISendLinkRequest): Promise<IResponse> {
    try {
      const url = `${this.URL_BASE}send-option-list`;
      const response = await lastValueFrom(
        this.httpService.post<IResponse>(url, data, {
          headers: {
            'client-token': process.env.CLIENT_TOKEN_ZAPI,
          },
        }),
      );
      return response.data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          httpResponses.GENERAL.UNKNOWN,
          HttpStatus.INTERNAL_SERVER_ERROR,
          { cause: error },
        );
      }
    }
  }

  async sendWhatsappMessage(
    phone: string,
    message: string,
    messageId?: string,
  ) {
    const aiResponse = await this.openaiService.generateAIResponse([
      { role: 'user', content: message },
    ]);

    return aiResponse;

    // await this.sendSimpleText({
    //   phone: this.formatPhoneNumber(phone),
    //   message: aiResponse,
    //   delayMessage: this.delayMessage,
    //   delayTyping: this.delayTyping,
    // });

    this.logger.log('Mensagem enviada com sucesso:', aiResponse);
  }
}
