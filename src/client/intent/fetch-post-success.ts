import { HTTPSource, Response as HTTPResponse } from '@cycle/http';
import xs from 'xstream';
import { Command, FetchPostSuccessCommand } from '../../command';

const intent = ({ HTTP }: { HTTP: HTTPSource; }): xs<Command> => {
  const response$: xs<HTTPResponse> = HTTP.select('post').flatten();
  const command$: xs<Command> = response$
    .map<FetchPostSuccessCommand>((response) => ({
      type: 'fetch-post-success',
      post: response.body as { // TODO
        data: string;
        date: string;
        html: string;
        minutes: number;
        pubdate: string;
        tags: string[];
        title: string;
      }
    }));
  return command$;
};

export { intent };
