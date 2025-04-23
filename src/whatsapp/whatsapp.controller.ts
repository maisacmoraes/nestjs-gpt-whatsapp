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

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Get('webhook')
  whatsappVerificationChallenge(@Req() req: Request): string | undefined {
    const mode = req.query['hub.mode'];
    const challenge = req.query['hub.challenge'];
    const token = req.query['hub.verify_token'];

    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;
    if (!mode || !token) {
      return 'Error verifying token';
    }

    if (mode === 'subscribe' && token === verifyToken) {
      console.log('WEBHOOK_VERIFIED');
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      return challenge?.toString();
    }
  }

  @Post('webhook')
  async handleIncomingWhatsappMessage(
    @Body()
    req: {
      entry: {
        changes: {
          value: {
            messages: { from: string; type: string; text?: { body: string } }[];
          };
        }[];
      }[];
    },
  ): Promise<void> {
    try {
      const messages = req.entry[0]?.changes[0]?.value?.messages;
      if (!messages || messages.length === 0) return;

      const message = messages[0];
      const { from, type } = message;

      if (type === 'text') {
        // const userMessage = message.text.body;

        await this.whatsappService.sendWhatsappMessage(from);
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error processing incoming message', 500);
    }
  }
}
