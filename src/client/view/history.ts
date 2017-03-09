import xs from 'xstream';
import {
  HistoryPoppedEvent,
  HistoryPushedEvent
} from '../../common/event';
import {
  HistoryCommand,
  HistoryBackCommand,
  HistoryForwardCommand,
  HistoryGoCommand,
  HistoryPushStateCommand,
  HistoryReplaceStateCommand
} from '@bouzuya/cyclejs-history-driver';

const view = (
  history$: xs<HistoryPoppedEvent | HistoryPushedEvent>
): xs<HistoryCommand> => {
  return history$
    .filter(({ type }) => type === 'history-pushed') // TODO
    .map<HistoryBackCommand | HistoryPushStateCommand>((event) => {
      if (event.type === 'history-pushed') {
        return {
          type: 'push-state',
          data: null,
          // title: null, // TODO
          url: event.path
        };
      } else {
        throw new Error();
      }
    });
};

export {
  view,
  HistoryCommand,
  HistoryBackCommand,
  HistoryForwardCommand,
  HistoryGoCommand,
  HistoryPushStateCommand,
  HistoryReplaceStateCommand
};
