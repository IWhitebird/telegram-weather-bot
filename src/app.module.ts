import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegrambotModule } from './telegrambot/telegrambot.module';
import  { ConfigModule} from '@nestjs/config'
import {MongooseModule} from '@nestjs/mongoose'

@Module({
  imports: [ConfigModule.forRoot() ,TelegrambotModule , MongooseModule.forRoot(process.env.MONGO_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
