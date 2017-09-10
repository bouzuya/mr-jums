import {
  EnterCommand,
  FetchPostSuccessCommand,
  FetchPostsSuccessCommand,
  GoToCommand,
  MenuCommand,
  NextCommand,
  PrevCommand,
  SelectCommand
} from '../command';

export type StateCommand =
  EnterCommand |
  FetchPostSuccessCommand |
  FetchPostsSuccessCommand |
  GoToCommand |
  MenuCommand |
  NextCommand |
  PrevCommand |
  SelectCommand;
