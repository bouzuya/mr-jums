import { Action } from './action';

export interface FetchPostsFailureAction extends Action {
  type: 'fetch-posts-failure';
}
