import xs from 'xstream';
import { Action } from '../action';
import { DOMSource } from '@cycle/dom';

const intent = ({ DOM }: { DOM: DOMSource }): xs<Action> => {
  const click$: xs<Event> = DOM.select('div.enter').events('click');
  const enter$: xs<Action> = click$.map<Action>(() => ({ type: 'enter' }));
  return enter$;
};

export { intent };
