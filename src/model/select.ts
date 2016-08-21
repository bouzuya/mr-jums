import xs from 'xstream';
import { CommandType } from '../command';
import { Command, Event, Message } from './message';

const select = <T extends Command>(
  message$: xs<Message>, type: CommandType
): xs<T> => {
  return message$.filter((message) => message.type === type) as xs<T>;
};

export { select, Event };
