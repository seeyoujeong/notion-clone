import { Store } from "@/core";
import { RootDocument } from "@/types";

export const documentListStore = new Store<RootDocument[]>([]);

export const documentEditorStore = new Store<any>({ title: "", content: "" });
