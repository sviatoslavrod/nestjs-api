import { IsTimestamp } from '../is-timestamp';

describe('IsTimestamp', () => {
  const timestampDate = 1646564400;

  it('should pass validation with valid timestamp', () => {
    class Test {
      @IsTimestamp()
      date = timestampDate;
    }

    const test = new Test();

    expect(test.date).toBe(timestampDate);
  });

  it('should throw error with message "Invalid timestamp input"', () => {
    try {
      class Test {
        @IsTimestamp()
        date = -timestampDate;
      }

      new Test();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty('message', 'Invalid timestamp input');
    }
  });
});
