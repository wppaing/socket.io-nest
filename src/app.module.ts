import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { EventGateway } from './event.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AppGateway, EventGateway],
})
export class AppModule {}
