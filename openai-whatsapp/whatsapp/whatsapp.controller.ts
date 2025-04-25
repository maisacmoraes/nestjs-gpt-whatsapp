import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
} from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { Request } from 'express';
import { WhatsappWebhookPayload } from './interfaces';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Get('webhook')
  whatsappVerificationChallenge(@Req() req: Request): string {
    const mode = req.query['hub.mode'] as string | undefined;
    const challenge = req.query['hub.challenge'] as string | undefined;
    const token = req.query['hub.verify_token'] as string | undefined;

    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;
    if (!mode || !token) {
      return 'Error verifying token';
    }

    if (mode === 'subscribe' && token === verifyToken) {
      return challenge ?? '';
    }

    return 'Invalid token or mode';
  }

  @Post('webhook')
  async handleIncomingWhatsappMessage(
    @Body() body: WhatsappWebhookPayload,
  ): Promise<void> {
    try {
      const messages = body.entry[0]?.changes[0]?.value?.messages;
      if (!messages || messages.length === 0) return;

      const message = messages[0];
      const { from, type, id } = message;

      await this.whatsappService.markAsRead(id);

      if (type === 'text' && message.text?.body) {
        const userMessage = message.text.body;
        await this.whatsappService.sendWhatsappMessage(from, userMessage, id);
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error processing incoming message', 500);
    }
  }
}
