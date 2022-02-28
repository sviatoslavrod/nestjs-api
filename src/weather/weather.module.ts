import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { HttpModule } from '@nestjs/axios';
import { WeatherResolver } from './weather.resolver';

@Module({
  imports: [HttpModule],
  providers: [WeatherResolver, WeatherService],
})
export class WeatherModule {}
