import { Command } from './command';

export interface FetchPostsFailureCommand extends Command {
  type: 'fetch-posts-failure';
}
