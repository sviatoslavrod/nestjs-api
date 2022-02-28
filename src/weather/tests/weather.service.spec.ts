import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from '../weather.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '../../config/config.module';
import { MAX_GET_WEATHER_DAYS } from '../../constants';

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [WeatherService],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return response from getWeather method with appropriate parameters', async () => {
    const res = await service.getWeather({
      lat: 10,
      lng: 10,
      date: Math.floor(Date.now() / 1000),
    });
    expect(res).toBeDefined();
  });

  it('should return error from getWeather method with date as timestamp less that current', async () => {
    try {
      await service.getWeather({
        lat: 10,
        lng: 10,
        date: Math.floor(Date.now() / 1000) - 100,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty('message', 'Date should not be in the past');
    }
  });

  it('should return error from getWeather method with date as timestamp more that 7 days from current timestamp', async () => {
    try {
      const dateInWeek = new Date();
      dateInWeek.setDate(dateInWeek.getDate() + MAX_GET_WEATHER_DAYS);
      const timestampSecondsInWeek = Math.floor(dateInWeek.getTime() / 1000);

      await service.getWeather({
        lat: 10,
        lng: 10,
        date: timestampSecondsInWeek + 100,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty('message', 'Date should be within a week');
    }
  });
});
