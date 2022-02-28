import { MAX_GET_WEATHER_DAYS } from '../constants';

export function IsDateWithinWeek(): PropertyDecorator {
  return function (target: Record<string, string>, propertyKey: string) {
    let value = target[propertyKey];

    const getter = () => value;

    const setter = (next) => {
      const currentTimestampSeconds = Math.floor(Date.now() / 1000);
      const dateInWeek = new Date();
      dateInWeek.setDate(dateInWeek.getDate() + MAX_GET_WEATHER_DAYS);
      const timestampSecondsInWeek = Math.floor(dateInWeek.getTime() / 1000);

      if (next < currentTimestampSeconds) {
        throw new Error('Date should not be in the past');
      }
      if (next > timestampSecondsInWeek) {
        throw new Error('Date should be within a week');
      }

      value = next;
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}
