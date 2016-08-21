import xs from 'xstream';
import { Action } from '../action';
import { DOMSource } from '@cycle/dom';

const intent = ({ DOM }: { DOM: DOMSource }): xs<Action> => {
  const click$: xs<Event> = DOM.select('div.next').events('click');
  const next$: xs<Action> = click$.map<Action>(() => ({ type: 'next' }));
  return next$;
};

export { intent };
