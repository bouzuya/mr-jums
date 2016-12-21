import { Command } from './command';

export interface EnterCommand extends Command {
  type: 'enter';
}
