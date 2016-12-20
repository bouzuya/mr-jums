import xs from 'xstream';
import { HistoryEvent } from '../../event';
import {
  HistoryCommand,
  HistoryBackCommand,
  HistoryForwardCommand,
  HistoryGoCommand,
  HistoryPushStateCommand,
  HistoryReplaceStateCommand
} from 'cyclejs-history-driver';

const view = (history$: xs<HistoryEvent>): xs<HistoryCommand> => {
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
