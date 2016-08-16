export type ActionType = 'toggle' | 'select';

export interface Action {
  type: ActionType;
}

export interface SelectAction extends Action {
  type: 'select';
  entryId: string;
}

export interface ToggleAction extends Action {
  type: 'toggle';
  checked: boolean;
}
