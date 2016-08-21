import xs from 'xstream';
import { Action } from '../action';
import { DOMSource } from '@cycle/dom';

const intent = ({ DOM }: { DOM: DOMSource }): xs<Action> => {
  const click$: xs<Event> = DOM.select('div.prev').events('click');
  const prev$: xs<Action> = click$.map<Action>(() => ({ type: 'prev' }));
  return prev$;
};

export { intent };
