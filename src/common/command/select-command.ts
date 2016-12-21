import { Command } from './command';

export interface SelectCommand extends Command {
  type: 'select';
  entryId: string;
}
