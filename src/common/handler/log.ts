import xs from 'xstream';
import { Message } from '../model/message';
import { NoopCommand } from '../../common/command';

const model = (message$: xs<Message>): xs<Message> => {
  const noop: NoopCommand = { type: 'noop' };
  return message$.map((message) => {
    console.log(message);
    return noop;
  });
};

export { model };
