import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ZapiService } from './zapi.service';
import { IZapiWebhookPayload } from './interfaces';

@Controller('whatsapp')
export class ZapiController {
  constructor(private readonly zapiService: ZapiService) {}

  @Post('webhook')
  async handleIncomingWhatsappMessage(
    @Body() body: IZapiWebhookPayload,
  ): Promise<void> {
    try {
      const { messageId, phone, type } = body;
      const message = body.text.message;

      if (type === 'ReceivedCallback' && body.text) {
        await this.zapiService.sendWhatsappMessage(phone, message, messageId);
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error processing incoming message', 500);
    }
  }
}
