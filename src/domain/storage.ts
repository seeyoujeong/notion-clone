import { storage } from "@/services";
import { DocumentContent } from "@/types";

const toggledStorage = storage<number[]>({
  _storage: localStorage,
  key: "notion_toggled",
  defaultValue: [],
});

export const toggleStateManager = {
  getIdList() {
    return toggledStorage.getItem();
  },
  addId(id: number) {
    if (!this.getIdList().includes(id)) {
      toggledStorage.setItem([...this.getIdList(), id]);
    }
  },
  deleteId(id: number) {
    toggledStorage.setItem(this.getIdList().filter((value) => value !== id));
  },
  has(id: number) {
    return this.getIdList().includes(id);
  },
  reset() {
    toggledStorage.removeItem();
  },
};

const documentListStorage = storage<DocumentContent[]>({
  _storage: localStorage,
  key: "notion_document_list",
  defaultValue: [],
});

type EditedContent = Pick<DocumentContent, "title" | "content">;

export const documentListStateManager = {
  getDocumentList() {
    return documentListStorage.getItem();
  },

  findDocumentById(
    documents: DocumentContent[],
    id: number
  ): DocumentContent | undefined {
    for (const doc of documents) {
      if (doc.id === id) return doc;

      const found = this.findDocumentById(doc.documents, id);
      if (found) return found;
    }
    return undefined;
  },

  getDocumentContent(id: number) {
    return this.findDocumentById(this.getDocumentList(), id);
  },

  addDocument(title: string, parentId: number | null = null) {
    const newDocument: DocumentContent = {
      id: Date.now(),
      title,
      content: "",
      documents: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (parentId) {
      const documentList = this.getDocumentList();
      const parentDocument = this.findDocumentById(documentList, parentId);
      if (parentDocument) {
        parentDocument.documents.push(newDocument);
        documentListStorage.setItem(documentList);
      }
    } else {
      documentListStorage.setItem([...this.getDocumentList(), newDocument]);
    }

    return newDocument;
  },

  deleteDocumentById(documents: DocumentContent[], id: number): boolean {
    for (let i = 0; i < documents.length; i++) {
      if (documents[i].id === id) {
        documents.splice(i, 1);
        return true;
      }

      if (this.deleteDocumentById(documents[i].documents, id)) {
        return true;
      }
    }
    return false;
  },

  deleteDocument(id: number) {
    const documents = this.getDocumentList();
    if (this.deleteDocumentById(documents, id)) {
      documentListStorage.setItem(documents);
    }
  },

  updateDocument(id: number, content: EditedContent) {
    const documentList = this.getDocumentList();

    const document = this.findDocumentById(documentList, id);

    if (document) {
      document.title = content.title;
      document.content = content.content;
      document.updatedAt = new Date().toISOString();
      documentListStorage.setItem(documentList);
    }
  },
};
