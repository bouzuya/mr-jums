import { Command } from './command';

export interface MenuCommand extends Command {
  type: 'menu';
}
