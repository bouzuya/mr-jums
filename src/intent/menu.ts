import xs from 'xstream';
import { Action } from '../action';
import { DOMSource } from '@cycle/dom';

const intent = ({ DOM }: { DOM: DOMSource }): xs<Action> => {
  const click$: xs<Event> = DOM.select('div.menu').events('click');
  const action$: xs<Action> = click$.map<Action>(() => ({ type: 'menu' }));
  return action$;
};

export { intent };
