import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ZapiService } from './zapi.service';
import { IZapiWebhookPayload } from './interfaces';

@Controller('webhook')
export class ZapiController {
  constructor(private readonly zapiService: ZapiService) {}

  @Post('zapi')
  async handleIncomingWhatsappMessage(
    @Body() body: IZapiWebhookPayload,
  ): Promise<void> {
    try {
      const { phone, type } = body;
      const message = body.text.message;

      if (type === 'ReceivedCallback' && body.text) {
        await this.zapiService.sendWhatsappMessage(phone, message);
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error processing incoming message', 500);
    }
  }

  @Post('postman')
  async handlePostmanRequest(@Body() body: { phone: string; message: string }) {
    try {
      const { phone, message } = body;
      return await this.zapiService.sendWhatsappMessage(phone, message);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error processing incoming message', 500);
    }
  }
}
