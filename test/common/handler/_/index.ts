import { Listener, Stream } from 'xstream';

const toPromise = <T>(s: Stream<T>): Promise<T[]> => {
  return new Promise<T[]>((resolve, reject) => {
    const values: T[] = [];
    const listener: Listener<T> = {
      complete() {
        s.removeListener(listener);
        resolve(values);
      },
      error(e) {
        s.removeListener(listener);
        reject(e);
      },
      next(value) {
        values.push(value);
      }
    };
    s.addListener(listener);
  });
};

export { toPromise };
