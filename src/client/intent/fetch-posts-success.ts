import { HTTPSource, Response as HTTPResponse } from '@cycle/http';
import xs from 'xstream';
import { Command, FetchPostsSuccessCommand } from './util/command';

const intent = ({ HTTP }: { HTTP: HTTPSource; }): xs<Command> => {
  const response$: xs<HTTPResponse> = HTTP.select('posts').flatten();
  const command$: xs<Command> = response$
    .map<FetchPostsSuccessCommand>((response) => ({
      type: 'fetch-posts-success',
      posts: response.body as { // TODO
        date: string; // yyyy-mm-dd in +09:00
        minutes: number;
        pubdate: string; // yyyy-mm-ddThh:mm:ss+09:00
        tags: string[];
        title: string;
      }[]
    }));
  return command$;
};

export { intent };
