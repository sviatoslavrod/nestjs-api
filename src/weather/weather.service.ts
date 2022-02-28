import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { WEATHER_API_KEY, WEATHER_API_URL } from '../config/constants';
import { ConfigService } from '../config/config.service';
import { map, Observable } from 'rxjs';
import { DailyWeatherDescriptionDTO } from './dto/daily-weather-description.dto';
import { IWeatherDailyData } from './interfaces/weather.interfaces';
import { Validator } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class WeatherService {
  private readonly weatherApiKey: string;
  private readonly weatherApiUrl: string;
  private readonly validator = new Validator();

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.weatherApiKey = configService.get(WEATHER_API_KEY);
    this.weatherApiUrl = configService.get(WEATHER_API_URL);
  }

  async getWeather(
    weatherData: DailyWeatherDescriptionDTO,
  ): Promise<Observable<IWeatherDailyData>> {
    try {
      const entity = plainToInstance(DailyWeatherDescriptionDTO, weatherData);
      await this.validator.validate(entity);

      const { lat, lng, date } = weatherData;

      const apiUrl = new URL(this.weatherApiUrl);
      apiUrl.searchParams.append('lat', lat.toString());
      apiUrl.searchParams.append('lon', lng.toString());
      apiUrl.searchParams.append('appid', this.weatherApiKey);

      return this.httpService.get(apiUrl.toString()).pipe(
        map((response) => {
          const dailyDataByTime = response.data.daily.find(
            (daily) => daily.dt === date,
          );
          if (!dailyDataByTime) {
            throw new Error(
              `Weather description was not found with parameters { lat: ${lat}, lng: ${lng}, date: ${date} }`,
            );
          }
          if (dailyDataByTime) {
            const weather = dailyDataByTime.weather;

            const description = weather.reduce((acc, weather, index, array) => {
              if (index !== array.length - 1) {
                acc += `${weather.description}, `;
              } else {
                acc += weather.description;
              }

              return acc;
            }, '');

            return {
              description,
            };
          }
        }),
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
