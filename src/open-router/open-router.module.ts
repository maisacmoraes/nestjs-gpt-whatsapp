import { Module } from '@nestjs/common';
import { OpenRouterService } from './open-router.service';
import { UserContextModule } from 'src/user-context/user-context.module';

@Module({
  imports: [UserContextModule],
  providers: [OpenRouterService],
  exports: [OpenRouterService],
})
export class OpenRouterModule {}
