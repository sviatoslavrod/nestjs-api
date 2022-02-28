import { Args, Field, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { WeatherService } from './weather.service';
import { IWeatherDailyData } from './interfaces/weather.interfaces';
import { Observable } from 'rxjs';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { DailyWeatherDescriptionInput } from './inputs/daily-weather-description.input';

@ObjectType('WeatherDailyData')
export class WeatherDailyData implements IWeatherDailyData {
  @Field()
  description: string;
}

@Resolver()
export class WeatherResolver {
  constructor(private readonly weatherService: WeatherService) {}

  @Query(() => WeatherDailyData)
  async weatherDescription(
    @Args('input', new ValidationPipe()) input: DailyWeatherDescriptionInput,
  ): Promise<Observable<IWeatherDailyData>> {
    const { lat, lng, date } = input;

    try {
      return await this.weatherService.getWeather({
        lat,
        lng,
        date,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
