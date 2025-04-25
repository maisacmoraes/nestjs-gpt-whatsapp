import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { UserContextModule } from 'openai-whatsapp/user-context-v1/user-context.module';

@Module({
  imports: [UserContextModule],
  providers: [OpenaiService],
  exports: [OpenaiService],
})
export class OpenaiModule {}
