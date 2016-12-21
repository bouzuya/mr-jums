import { Entry } from './entry';

export interface EntryDetail extends Entry {
  html: string;
  minutes: number;
  pubdate: string;
  tags: string[];
}
