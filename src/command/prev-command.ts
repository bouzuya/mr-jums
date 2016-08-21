import { Command } from './command';

export interface PrevCommand extends Command {
  type: 'prev';
}
