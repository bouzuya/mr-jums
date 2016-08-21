import { Command } from './command';

export interface NextCommand extends Command {
  type: 'next';
}
