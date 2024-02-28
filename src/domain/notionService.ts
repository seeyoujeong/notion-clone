import { browserHistory } from "@/services";
import { documentListStore, notionApi, notionRouter } from ".";

const notionService = {
  async addDocument(parentId: number | null) {
    await notionApi.postDocument("새 제목", parentId);

    documentListStore.setState(await notionApi.getAllDocuments());
  },
  async deleteDocument(id: number) {
    await notionApi.deleteDocument(id);

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
};

export default notionService;
