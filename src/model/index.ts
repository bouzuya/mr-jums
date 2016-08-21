import xs from 'xstream';
import { Command } from '../command';
import { Event } from '../event';
import { model as request$ } from './request';
import { model as state$ } from './state';

const model = (command$: xs<Command>): xs<Event> => {
  const event$ = xs.merge(
    request$(command$),
    state$(command$)
  );
  return event$;
};

export { model };
