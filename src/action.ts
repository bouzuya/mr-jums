export type ActionType =
  'enter' |
  'fetch-posts-failure' |
  'fetch-posts-request' |
  'fetch-posts-success' |
  'menu' |
  'next' |
  'prev' |
  'select';

export interface Action {
  type: ActionType;
}

export interface FetchPostsFailureAction extends Action {
  type: 'fetch-posts-failure';
}

export interface FetchPostsRequestAction extends Action {
  type: 'fetch-posts-request';
  request: any; // TODO
}

export interface FetchPostsSuccessAction extends Action {
  type: 'fetch-posts-success';
  posts: {
    date: string; // yyyy-mm-dd in +09:00
    minutes: number;
    pubdate: string; // yyyy-mm-ddThh:mm:ss+09:00
    tags: string[];
    title: string;
  }[];
}

export interface EnterAction extends Action {
  type: 'enter';
}

export interface MenuAction extends Action {
  type: 'menu';
}

export interface NextAction extends Action {
  type: 'next';
}

export interface PrevAction extends Action {
  type: 'prev';
}

export interface SelectAction extends Action {
  type: 'select';
  entryId: string;
}
