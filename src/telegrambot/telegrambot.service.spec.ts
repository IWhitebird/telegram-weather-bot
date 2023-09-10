import { Test, TestingModule } from '@nestjs/testing';
import { TelegrambotService } from './telegrambot.service';

describe('TelegrambotService', () => {
  let service: TelegrambotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelegrambotService],
    }).compile();

    service = module.get<TelegrambotService>(TelegrambotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
