import xs from 'xstream';

import { Sources } from '../type/sources';
import { Command, FetchPostSuccessCommand } from './util/command';

const intent = ({ HTTP }: Sources): xs<Command> => {
  const response$ = HTTP.select('post').flatten();
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
