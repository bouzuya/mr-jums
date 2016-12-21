import { Command } from './command';

export interface FetchPostSuccessCommand extends Command {
  type: 'fetch-post-success';
  post: {
    data: string;
    date: string; // yyyy-mm-dd in +09:00
    html: string;
    minutes: number;
    pubdate: string; // yyyy-mm-ddThh:mm:ss+09:00
    tags: string[];
    title: string;
  };
}
