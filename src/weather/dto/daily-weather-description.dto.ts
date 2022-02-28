import { IsNotEmpty, IsNumber } from 'class-validator';
import { IWeatherDailyDescription } from '../interfaces/weather.interfaces';
import { IsDateWithinWeek } from '../../pipes/is-date-within-week';

export class DailyWeatherDescriptionDTO implements IWeatherDailyDescription {
  @IsNotEmpty({
    message: 'To get weather description you need to provide latitude',
  })
  @IsNumber()
  readonly lat: number;

  @IsNotEmpty({
    message: 'To get weather description you need to provide longitude',
  })
  @IsNumber()
  readonly lng: number;

  @IsDateWithinWeek()
  @IsNotEmpty({
    message: 'To get weather description you need to provide date',
  })
  readonly date: number;
}
