import xs from 'xstream';
import {
  Command,
  CommandType,
  EnterCommand,
  FetchPostsRequestCommand,
  FetchPostsSuccessCommand,
  MenuCommand,
  NextCommand,
  PrevCommand,
  SelectCommand
} from '../command';
import {
  Event,
  RequestEvent,
  StateEvent
} from '../event';
import { EntryViewer } from '../type';

const select = <T extends Command>(
  command$: xs<Command>, type: CommandType
): xs<T> => {
  return command$.filter((command) => command.type === type) as xs<T>;
};

const entries = [
  { id: '2016-01-31', title: 'Entry 31', body: 'Entry Body 31' },
  { id: '2016-01-30', title: 'Entry 30', body: 'Entry Body 30' },
  { id: '2016-01-29', title: 'Entry 29', body: 'Entry Body 29' },
  { id: '2016-01-28', title: 'Entry 28', body: 'Entry Body 28' },
  { id: '2016-01-27', title: 'Entry 27', body: 'Entry Body 27' },
  { id: '2016-01-26', title: 'Entry 26', body: 'Entry Body 26' },
  { id: '2016-01-25', title: 'Entry 25', body: 'Entry Body 25' },
  { id: '2016-01-24', title: 'Entry 24', body: 'Entry Body 24' },
  { id: '2016-01-23', title: 'Entry 23', body: 'Entry Body 23' },
  { id: '2016-01-22', title: 'Entry 22', body: 'Entry Body 22' },
  { id: '2016-01-21', title: 'Entry 21', body: 'Entry Body 21' },
  { id: '2016-01-20', title: 'Entry 20', body: 'Entry Body 20' },
  { id: '2016-01-19', title: 'Entry 19', body: 'Entry Body 19' },
  { id: '2016-01-18', title: 'Entry 18', body: 'Entry Body 18' },
  { id: '2016-01-17', title: 'Entry 17', body: 'Entry Body 17' },
  { id: '2016-01-16', title: 'Entry 16', body: 'Entry Body 16' },
  { id: '2016-01-15', title: 'Entry 15', body: 'Entry Body 15' },
  { id: '2016-01-14', title: 'Entry 14', body: 'Entry Body 14' },
  { id: '2016-01-13', title: 'Entry 13', body: 'Entry Body 13' },
  { id: '2016-01-12', title: 'Entry 12', body: 'Entry Body 12' },
  { id: '2016-01-11', title: 'Entry 11', body: 'Entry Body 11' },
  { id: '2016-01-10', title: 'Entry 10', body: 'Entry Body 10' },
  { id: '2016-01-09', title: 'Entry 09', body: 'Entry Body 09' },
  { id: '2016-01-08', title: 'Entry 08', body: 'Entry Body 08' },
  { id: '2016-01-07', title: 'Entry 07', body: 'Entry Body 07' },
  { id: '2016-01-06', title: 'Entry 06', body: 'Entry Body 06' },
  { id: '2016-01-05', title: 'Entry 05', body: 'Entry Body 05' },
  { id: '2016-01-04', title: 'Entry 04', body: 'Entry Body 04' },
  { id: '2016-01-03', title: 'Entry 03', body: 'Entry Body 03' },
  { id: '2016-01-02', title: 'My blog is dead', body: 'Good-bye, bbn-cycle!' },
  { id: '2016-01-01', title: 'My first entry', body: 'Hello, bbn-cycle!' }
];

const request$ = (command$: xs<Command>): xs<RequestEvent> => {
  const request$ = select<FetchPostsRequestCommand>(
    command$, 'fetch-posts-request')
    .map(({ request }) => request)
    .map<RequestEvent>((request) => ({ type: 'request', request }));
  return request$;
};

const state$ = (command$: xs<Command>): xs<StateEvent> => {
  const state$: xs<StateEvent> = xs
    .merge(
    select<EnterCommand>(command$, 'enter'),
    select<FetchPostsSuccessCommand>(command$, 'fetch-posts-success'),
    select<MenuCommand>(command$, 'menu'),
    select<SelectCommand>(command$, 'select'),
    select<NextCommand>(command$, 'next'),
    select<PrevCommand>(command$, 'prev')
    )
    .fold((state, command) => {
      const { entryViewer, menu } = state;
      if (command.type === 'select') {
        return Object.assign({}, state, {
          entryViewer: entryViewer.select(command.entryId),
          menu: false
        });
      } else if (command.type === 'fetch-posts-success') {
        const posts = command.posts
          .map(({ date, title }) => ({ id: date, title }))
          .sort(({ id: a }, { id: b}) => a < b ? 1 : (a === b ? 0 : 1));
        return Object.assign({}, state, {
          entryViewer: EntryViewer.create(posts)
        });
      } else if (command.type === 'menu') {
        return Object.assign({}, state, { menu: true });
      } else if (command.type === 'enter') {
        return Object.assign({}, state, {
          entryViewer: entryViewer.select(),
          menu: false
        });
      } else if (command.type === 'next') {
        return Object.assign({}, state, {
          entryViewer: menu ? entryViewer.focusNext() : entryViewer.selectNext()
        });
      } else if (command.type === 'prev') {
        return Object.assign({}, state, {
          entryViewer: menu ? entryViewer.focusPrev() : entryViewer.selectPrev()
        });
      } else {
        // unknown command: do nothing
        return state;
      }
    }, {
      entryViewer: EntryViewer.create(entries),
      menu: true
    })
    .map<StateEvent>((state) => ({ type: 'state', state }));
  return state$;
};

const model = (command$: xs<Command>): xs<Event> => {
  const event$ = xs.merge(
    request$(command$),
    state$(command$)
  );
  return event$;
};

export { model };
