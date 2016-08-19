export type ActionType = 'enter' | 'menu' | 'next' | 'prev' | 'select';

export interface Action {
  type: ActionType;
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
