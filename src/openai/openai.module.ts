import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { UserContextModule } from 'src/user-context/user-context.module';

@Module({
  imports: [UserContextModule],
  providers: [OpenaiService],
  exports: [OpenaiService],
})
export class OpenaiModule {}
