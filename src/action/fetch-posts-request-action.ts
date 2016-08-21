import { Action } from './action';

export interface FetchPostsRequestAction extends Action {
  type: 'fetch-posts-request';
  request: any; // TODO
}
