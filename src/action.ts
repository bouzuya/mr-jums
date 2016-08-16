export type ActionType = 'toggle';

export interface Action {
  type: ActionType;
}

export interface ToggleAction extends Action {
  type: 'toggle';
  checked: boolean;
}
