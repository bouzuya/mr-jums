import { Entry } from './entry';

export interface EntryDetail extends Entry {
  description: string;
  html: string;
  minutes: number;
  pubdate: string;
  tags: string[];
}
