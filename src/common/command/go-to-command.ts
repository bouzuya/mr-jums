import { Command } from './command';

export interface GoToCommand extends Command {
  type: 'go-to';
  path: string;
}
