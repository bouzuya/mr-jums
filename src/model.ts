import xs from 'xstream';
import { Action, ActionType, ToggleAction } from './action';

const select = <T extends Action>(
  action$: xs<Action>, type: ActionType
): xs<T> => {
  return action$.filter((action) => action.type === type) as xs<T>;
};

const model = (action$: xs<Action>): xs<boolean> => {
  const state$: xs<boolean> = select<ToggleAction>(action$, 'toggle')
    .map(({ checked }) => checked)
    .startWith(false);
  return state$;
};

export { model };
