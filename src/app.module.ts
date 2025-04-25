import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ZapiModule } from './zapi/zapi.module';
import { OpenRouterModule } from './open-router/open-router.module';
import { UserContextModule } from './user-context/user-context.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OpenRouterModule,
    UserContextModule,
    ZapiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
