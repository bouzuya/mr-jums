import { Action } from './action';

export interface SelectAction extends Action {
  type: 'select';
  entryId: string;
}
