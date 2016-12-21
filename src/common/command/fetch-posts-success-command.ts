import { Command } from './command';

export interface FetchPostsSuccessCommand extends Command {
  type: 'fetch-posts-success';
  posts: {
    date: string; // yyyy-mm-dd in +09:00
    minutes: number;
    pubdate: string; // yyyy-mm-ddThh:mm:ss+09:00
    tags: string[];
    title: string;
  }[];
}
