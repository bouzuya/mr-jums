import { DriverFunction, StreamAdapter } from '@cycle/base';

const makeTitleDriver = (): DriverFunction => {
  return (sink$: any, adapter: StreamAdapter): any => {
    adapter.streamSubscribe(sink$, {
      next(title: string) {
        if (typeof window === 'undefined') return;
        if (typeof window.document === 'undefined') return;
        window.document.title = title;
      },
      error() {
      },
      complete() {
      }
    });
  };
};

export { makeTitleDriver };
