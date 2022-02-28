import { Inject, Injectable } from '@nestjs/common';
import { APP_CONFIG } from './constants';

@Injectable()
export class ConfigService {
  constructor(@Inject(APP_CONFIG) private appConfig) {}

  get(key: string): string {
    return this.appConfig[key];
  }
}
