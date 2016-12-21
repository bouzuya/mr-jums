import { Command } from './command';

export interface NoopCommand extends Command {
  type: 'noop';
}
