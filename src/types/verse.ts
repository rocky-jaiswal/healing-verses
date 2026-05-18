export interface Verse {
  id: number;
  reference: string;
  text: string;
}

export interface VerseCollection {
  meta: {
    title: string;
    version: string;
    description: string;
  };
  verses: Verse[];
}
