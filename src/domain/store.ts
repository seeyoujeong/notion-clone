import { Store } from "@/core";
import { DocumentListContent } from "@/types";

export const documentListStore = new Store<DocumentListContent[]>([]);

interface EditorContentType {
  title: string;
  content: string;
}

export const documentEditorStore = new Store<EditorContentType>({
  title: "",
  content: "",
});
