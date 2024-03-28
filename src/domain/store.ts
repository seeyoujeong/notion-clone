import { Store } from "@/core";
import { DocumentListContent } from "@/types";

export const documentListStore = new Store<DocumentListContent[]>([]);

export const documentEditorStore = new Store<any>({ title: "", content: "" });
