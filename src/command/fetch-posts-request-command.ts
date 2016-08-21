import { Command } from './command';

export interface FetchPostsRequestCommand extends Command {
  type: 'fetch-posts-request';
  request: any; // TODO
}
