export function IsTimestamp(): PropertyDecorator {
  return function (target: Record<string, string>, propertyKey: string) {
    let value = target[propertyKey];

    const getter = () => value;

    const setter = (next) => {
      if (new Date(next).getTime() <= 0) {
        throw new Error('Invalid timestamp input');
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
