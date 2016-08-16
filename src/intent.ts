import xs from 'xstream';
import { Action } from './action';
import { DOMSource } from '@cycle/dom';

const intent = ({ DOM }: { DOM: DOMSource }): xs<Action> => {
  const click$: xs<Event> = DOM.select('input').events('click');
  const action$: xs<Action> = click$
    .map((event) => (event.target as any).checked)
    .map<Action>((checked) => ({ type: 'toggle', checked }));
  return action$;
};

export { intent };
