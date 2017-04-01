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
  return history$.map((event): HistoryPushStateCommand => {
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
