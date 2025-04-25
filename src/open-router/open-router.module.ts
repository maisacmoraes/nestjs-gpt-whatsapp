import { Module } from '@nestjs/common';
import { UserContextModule } from 'openai-whatsapp/user-context/user-context.module';
import { OpenRouterService } from './open-router.service';

@Module({
  imports: [UserContextModule],
  providers: [OpenRouterService],
  exports: [OpenRouterService],
})
export class OpenRouterModule {}
