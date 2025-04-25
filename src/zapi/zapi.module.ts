import { Module } from '@nestjs/common';
import { ZapiService } from './zapi.service';
import { ZapiController } from './zapi.controller';
import { OpenaiModule } from 'openai-whatsapp/openai/openai.module';

@Module({
  imports: [OpenaiModule],
  controllers: [ZapiController],
  providers: [ZapiService],
  exports: [ZapiService],
})
export class ZapiModule {}
