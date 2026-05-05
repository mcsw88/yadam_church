export type NewsKind = "notice" | "event" | "bulletin";
export type NewsTabId = "notices" | "events" | "bulletins";

export interface Notice {
  kind: "notice";
  id: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  attachments?: AttachmentFile[];
}

export interface NewsEvent {
  kind: "event";
  id: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  attachments?: AttachmentFile[];
}

export interface Bulletin {
  kind: "bulletin";
  id: string;
  title: string;
  date: string;
  hymnNumber1: string | null;
  hymnNumber2: string | null;
  representativePrayer: string | null;
  sermonTitle: string | null;
  benediction: string | null;
}

export type NewsItem = Notice | NewsEvent | Bulletin;

export interface NewsDataMap {
  notices: Notice[];
  events: NewsEvent[];
  bulletins: Bulletin[];
}

export interface AttachmentFile {
  name: string;
  url: string;
  path?: string;
  size?: number;
  type?: string;
}
