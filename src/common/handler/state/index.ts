import xs from 'xstream';
import {
  EnterCommand,
  FetchPostSuccessCommand,
  FetchPostsSuccessCommand,
  MenuCommand,
  NextCommand,
  PrevCommand,
  SelectCommand
} from '../../command';
// StateCommand
import { StateEvent } from '../../event';
import { State } from '../../type/state';
import { Message } from '../../model/message';
import { select } from '../util/select';

import { enter } from './enter';
import { fetchPostSuccess } from './fetch-post-success';
import { fetchPostsSuccess } from './fetch-posts-success';
import { menu } from './menu';
import { next } from './next';
import { prev } from './prev';
import { select as doSelect } from './select';

type StateCommand =
  EnterCommand |
  FetchPostSuccessCommand |
  FetchPostsSuccessCommand |
  MenuCommand |
  NextCommand |
  PrevCommand |
  SelectCommand;

const intent = (message$: xs<Message>): xs<StateCommand> => {
  return xs.merge<StateCommand>(
    select<EnterCommand>(message$, 'enter'),
    select<FetchPostSuccessCommand>(message$, 'fetch-post-success'),
    select<FetchPostsSuccessCommand>(message$, 'fetch-posts-success'),
    select<MenuCommand>(message$, 'menu'),
    select<NextCommand>(message$, 'next'),
    select<PrevCommand>(message$, 'prev'),
    select<SelectCommand>(message$, 'select')
  );
};

const model = (command$: xs<StateCommand>, initialState: State): xs<State> => {
  return command$.fold((state: State, command: StateCommand) => {
    if (command.type === 'enter') {
      return enter(state, command);
    } else if (command.type === 'fetch-post-success') {
      return fetchPostSuccess(state, command);
    } else if (command.type === 'fetch-posts-success') {
      return fetchPostsSuccess(state, command);
    } else if (command.type === 'menu') {
      return menu(state, command);
    } else if (command.type === 'next') {
      return next(state, command);
    } else if (command.type === 'prev') {
      return prev(state, command);
    } else if (command.type === 'select') {
      return doSelect(state, command);
    } else {
      // unknown command: do nothing
      return state;
    }
  }, initialState);
};

const view = (state$: xs<State>): xs<StateEvent> => {
  return state$.map<StateEvent>((state) => ({ type: 'state', state }));
};

const handler = (message$: xs<Message>, init: State): xs<Message> => {
  return view(model(intent(message$), init)).remember();
};

export { handler as model };
