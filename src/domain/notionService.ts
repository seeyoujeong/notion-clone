import { browserHistory } from "@/services";
import {
  documentEditorStore,
  documentListStore,
  notionApi,
  notionRouter,
  toggleStateManager,
} from ".";
import { addIsToggledToDocuments } from "@/utils";

const notionService = {
  async addDocument(parentId: number | null) {
    const { id } = await notionApi.postDocument("", parentId);
    parentId && toggleStateManager.addId(parentId);

    browserHistory.push(String(id));

    documentListStore.setState(await notionApi.getAllDocuments());
  },
  async deleteDocument(id: number) {
    await notionApi.deleteDocument(id);
    toggleStateManager.deleteId(id);

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
    if (toggleStateManager.has(id)) {
      toggleStateManager.deleteId(id);
    } else {
      toggleStateManager.addId(id);
    }

    const convertedDocuments = addIsToggledToDocuments(
      documentListStore.getState(),
      toggleStateManager.getIdList()
    );

    documentListStore.setState(convertedDocuments);
  },
  async getDocumentList() {
    documentListStore.setState(await notionApi.getAllDocuments());
  },
  async getDocumentContent(id: number) {
    try {
      const content = await notionApi.getDocumentContent(id);

      if (content) {
        documentEditorStore.setState({
          title: content.title,
          content: content.content,
        });
      }
    } catch (err) {
      alert("없는 문서입니다.");
      browserHistory.replace("/");
    }
  },
};

export default notionService;
