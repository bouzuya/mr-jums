import { Command } from './command';

export interface BackCommand extends Command {
  type: 'back';
  path: string;
}
