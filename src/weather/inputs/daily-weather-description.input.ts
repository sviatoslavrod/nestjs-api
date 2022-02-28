import { Field, InputType, Int } from '@nestjs/graphql';
import { IsTimestamp } from '../../pipes/is-timestamp';
import { IWeatherDailyDescription } from '../interfaces/weather.interfaces';

@InputType()
export class DailyWeatherDescriptionInput implements IWeatherDailyDescription {
  @Field(() => Int)
  readonly lat: number;

  @Field(() => Int)
  readonly lng: number;

  @IsTimestamp()
  @Field(() => Int)
  readonly date: number;
}
