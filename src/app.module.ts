import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegrambotModule } from './telegrambot/telegrambot.module';
import  { ConfigModule} from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot() ,TelegrambotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
