import xs from 'xstream';
import { HistoryPushedEvent } from '../../common/event';
import {
  HistoryCommand,
  HistoryBackCommand,
  HistoryForwardCommand,
  HistoryGoCommand,
  HistoryPushStateCommand,
  HistoryReplaceStateCommand
} from '@bouzuya/cyclejs-history-driver';

const view = (history$: xs<HistoryPushedEvent>): xs<HistoryCommand> => {
  return history$
    .map<HistoryPushStateCommand>((event) => {
      return {
        type: 'push-state',
        data: null,
        // title: null, // TODO
        url: event.path
      };
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
