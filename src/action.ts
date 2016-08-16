export type ActionType = 'enter' | 'next' | 'prev' | 'select';

export interface Action {
  type: ActionType;
}

export interface EnterAction extends Action {
  type: 'enter';
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
