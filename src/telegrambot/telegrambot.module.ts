import { Module } from '@nestjs/common';
import { TelegrambotService } from './telegrambot.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [TelegrambotService],
  exports: [TelegrambotService],
})
export class TelegrambotModule {}