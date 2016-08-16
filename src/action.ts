export type ActionType = 'next' | 'prev' | 'select' | 'toggle';

export interface Action {
  type: ActionType;
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

export interface ToggleAction extends Action {
  type: 'toggle';
  checked: boolean;
}
