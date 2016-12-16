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
import { StateEvent } from '../../event';
import {
  create,
  focusNext, focusPrev,
  select as entryViewerSelect, selectNext, selectPrev
} from '../../model/entry-viewer';
import { State } from '../../type';
import { Command, Event, Message } from '../message';
import { select } from '../select';

const doSelect = (state: State, command: SelectCommand): State => {
  const { entryViewer } = state;
  return Object.assign({}, state, {
    entryViewer: entryViewerSelect(entryViewer, command.entryId),
    menu: false
  });
};

const fetchPostSuccess = (
  state: State, command: FetchPostSuccessCommand
): State => {
  const { date, html, minutes, pubdate, tags, title } = command.post;
  const entry = { id: date, html, minutes, pubdate, tags, title };
  return Object.assign({}, state, { entry });
};

const fetchPostsSuccess = (
  state: State, command: FetchPostsSuccessCommand
): State => {
  const posts = command.posts
    .map(({ date, title }) => ({ id: date, title }))
    .sort(({ id: a }, { id: b }) => a > b ? -1 : (a === b ? 0 : 1));
  return Object.assign({}, state, {
    entryViewer: create(posts)
  });
};

const menu = (state: State, _: MenuCommand): State => {
  return Object.assign({}, state, { menu: true });
};

const enter = (state: State, _: EnterCommand): State => {
  const { entryViewer } = state;
  return Object.assign({}, state, {
    entryViewer: entryViewerSelect(entryViewer),
    menu: false
  });
};

const next = (state: State, _: NextCommand): State => {
  const { menu, entryViewer } = state;
  return Object.assign({}, state, {
    entryViewer: menu === true
      ? focusNext(entryViewer) : selectNext(entryViewer)
  });
};

const prev = (state: State, _: PrevCommand): State => {
  const { menu, entryViewer } = state;
  return Object.assign({}, state, {
    entryViewer: menu === true
      ? focusPrev(entryViewer) : selectPrev(entryViewer)
  });
};

type MyCommand =
  EnterCommand |
  FetchPostSuccessCommand |
  FetchPostsSuccessCommand |
  MenuCommand |
  SelectCommand |
  NextCommand |
  PrevCommand;

const model = (command$: xs<Message>, initialState: State): xs<StateEvent> => {
  const state$: xs<StateEvent> = xs
    .merge<MyCommand>(
    select<EnterCommand>(command$, 'enter'),
    select<FetchPostSuccessCommand>(command$, 'fetch-post-success'),
    select<FetchPostsSuccessCommand>(command$, 'fetch-posts-success'),
    select<MenuCommand>(command$, 'menu'),
    select<SelectCommand>(command$, 'select'),
    select<NextCommand>(command$, 'next'),
    select<PrevCommand>(command$, 'prev')
    )
    .fold((state: State, command: MyCommand) => {
      if (command.type === 'select') {
        return doSelect(state, command);
      } else if (command.type === 'fetch-post-success') {
        return fetchPostSuccess(state, command);
      } else if (command.type === 'fetch-posts-success') {
        return fetchPostsSuccess(state, command);
      } else if (command.type === 'menu') {
        return menu(state, command);
      } else if (command.type === 'enter') {
        return enter(state, command);
      } else if (command.type === 'next') {
        return next(state, command);
      } else if (command.type === 'prev') {
        return prev(state, command);
      } else {
        // unknown command: do nothing
        return state;
      }
    }, initialState)
    .map<StateEvent>((state) => ({ type: 'state', state }));
  return state$;
};

export { model, Command, Event };
