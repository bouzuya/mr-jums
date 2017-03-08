import { Command } from './command';

export interface HistoryCommand extends Command {
  type: 'history'; // = popstate (`history.back()` or `history.forward()`)
  path: string;
}
