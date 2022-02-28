import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../config.service';
import { WEATHER_API_KEY } from '../constants';
import { configFactory } from '../config.module';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, configFactory],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a value on call get method with string parameter which exists in env file', () => {
    expect(service.get(WEATHER_API_KEY)).toBeDefined();
  });

  it('should return undefined on call get method with string parameter which does not exist in env file', () => {
    expect(service.get('test')).toBeUndefined();
  });
});
