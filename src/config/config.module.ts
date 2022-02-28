import { Global, Module, Provider } from '@nestjs/common';
import { ConfigService } from './config.service';
import { APP_CONFIG } from './constants';
import * as dotenv from 'dotenv';
import * as path from 'path';

export const configFactory: Provider = {
  provide: APP_CONFIG,
  useFactory: () => {
    let envFileName = '.env';
    if (process.env.NODE_ENV === 'development') {
      envFileName = '.env.dev';
    }
    return dotenv.config({
      path: path.resolve(__dirname, `../../${envFileName}`),
    }).parsed;
  },
};

@Global()
@Module({
  exports: [APP_CONFIG, ConfigService],
  providers: [ConfigService, configFactory],
})
export class ConfigModule {}
