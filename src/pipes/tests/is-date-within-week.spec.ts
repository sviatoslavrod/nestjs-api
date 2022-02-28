import { IsDateWithinWeek } from '../is-date-within-week';
import { MAX_GET_WEATHER_DAYS } from '../../constants';

describe('IsDateWithinWeek', () => {
  const timestampDate = Math.floor(Date.now() / 1000) + 100;

  it('should pass validation with valid timestamp', () => {
    class Test {
      @IsDateWithinWeek()
      date = Math.floor(Date.now() / 1000) + 100;
    }

    const test = new Test();

    expect(test.date).toBe(timestampDate);
  });

  it('should throw error with message "Date should not be in the past" when timestamp less that current', () => {
    try {
      class Test {
        @IsDateWithinWeek()
        date = Math.floor(Date.now() / 1000) - 100;
      }

      new Test();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty('message', 'Date should not be in the past');
    }
  });

  it('should throw error with message "Date should not be in the past" when timestamp greater that in a 7 weeks from current', () => {
    try {
      const dateInWeek = new Date();
      dateInWeek.setDate(dateInWeek.getDate() + MAX_GET_WEATHER_DAYS);
      const timestampSecondsInWeek = Math.floor(dateInWeek.getTime() / 1000);

      class Test {
        @IsDateWithinWeek()
        date = timestampSecondsInWeek + 100;
      }

      new Test();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty('message', 'Date should be within a week');
    }
  });
});
