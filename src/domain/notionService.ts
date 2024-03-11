import { browserHistory } from "@/services";
import {
  documentEditorStore,
  documentListStore,
  notionApi,
  notionRouter,
  toggledStorage,
} from ".";

const notionService = {
  async addDocument(parentId: number | null) {
    const { id } = await notionApi.postDocument("", parentId);
    parentId && toggledStorage.addId(parentId);

    browserHistory.push(String(id));

    documentListStore.setState(await notionApi.getAllDocuments());
  },
  async deleteDocument(id: number) {
    await notionApi.deleteDocument(id);
    toggledStorage.deleteId(id);

    documentListStore.setState(await notionApi.getAllDocuments());

    if (Number(notionRouter.params.id) === id) {
      browserHistory.replace("/");
    }
  },
  moveDetailPage(id: number) {
    browserHistory.push(String(id));
  },
  async updateDocument(id: number, title: string, content: string) {
    await notionApi.putDocument(id, { title, content });

    documentListStore.setState(await notionApi.getAllDocuments());
  },
  toggleDocument(id: number) {
    if (toggledStorage.has(id)) {
      toggledStorage.deleteId(id);
    } else {
      toggledStorage.addId(id);
    }

    documentListStore.notify();
  },
  async getDocumentList() {
    documentListStore.setState(await notionApi.getAllDocuments());
  },
  async getDocumentContent(id: number) {
    try {
      const { title, content } = await notionApi.getDocumentContent(id);

      documentEditorStore.setState({ title, content });
    } catch (err) {
      alert("없는 문서입니다.");
      browserHistory.replace("/");
    }
  },
};

export default notionService;
