import { Module } from '@nestjs/common';
import { ZapiService } from './zapi.service';
import { ZapiController } from './zapi.controller';

@Module({
  controllers: [ZapiController],
  providers: [ZapiService],
  exports: [ZapiService],
})
export class ZapiModule {}
