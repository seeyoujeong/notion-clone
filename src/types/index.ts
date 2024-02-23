interface DefaultContent {
  id: number;
  title: string;
}

interface DateContent {
  createdAt: string;
  updatedAt: string;
}

export interface DocumentContent extends DefaultContent, DateContent {
  content: string;
  documents: DocumentContent[];
}

export interface RootDocument extends DefaultContent {
  documents: RootDocument[];
}

export interface ResponsePostDocument extends DefaultContent, DateContent {}
