import { Module } from '@nestjs/common';
import { ZapiService } from './zapi.service';
import { ZapiController } from './zapi.controller';
import { OpenRouterModule } from 'src/open-router/open-router.module';

@Module({
  imports: [OpenRouterModule],
  controllers: [ZapiController],
  providers: [ZapiService],
  exports: [ZapiService],
})
export class ZapiModule {}
