import xs from 'xstream';
import { Action, FetchPostsSuccessAction } from '../action';
import { HTTPSource, Response as HTTPResponse } from '@cycle/http';

const intent = ({ HTTP }: { HTTP: HTTPSource; }): xs<Action> => {
  const response$: xs<HTTPResponse> = HTTP.select('posts').flatten();
  const action$: xs<Action> = response$
    .map<FetchPostsSuccessAction>((response) => ({
      type: 'fetch-posts-success',
      posts: response.body as { // TODO
        date: string; // yyyy-mm-dd in +09:00
        minutes: number;
        pubdate: string; // yyyy-mm-ddThh:mm:ss+09:00
        tags: string[];
        title: string;
      }[]
    }));
  return action$;
};

export { intent };
