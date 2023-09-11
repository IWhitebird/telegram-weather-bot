import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import  { ConfigModule} from '@nestjs/config'
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TelegrambotModule } from './telegrambot/telegrambot.module';
@Module({
  imports: [TelegrambotModule ,ConfigModule.forRoot() , UsersModule , MongooseModule.forRoot(process.env.MONGO_URL),  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
