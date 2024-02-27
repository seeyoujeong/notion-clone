import { API_ENDPOINT_URL, API_HEADER_X_USERNAME } from "@/constants";
import { createApiClient } from "@/services";
import { DocumentContent, ResponsePostDocument, RootDocument } from "@/types";
import { joinWithSlash } from "@/utils";

const apiClient = createApiClient(API_ENDPOINT_URL, {
  headers: {
    "Content-Type": "application/json",
    "x-username": API_HEADER_X_USERNAME,
  },
});

type EditedContent = Pick<DocumentContent, "title" | "content">;

const DOCUMENTS = "documents";

const notionApi = {
  async getAllDocuments() {
    const documents = await apiClient.get<RootDocument[]>(DOCUMENTS);

    return documents;
  },
  async getDocumentContent(id: number) {
    const content = await apiClient.get<DocumentContent>(
      joinWithSlash(DOCUMENTS, id)
    );

    return content;
  },
  async postDocument(title: string, parentId: number | null = null) {
    const content = await apiClient.post<ResponsePostDocument>(DOCUMENTS, {
      title,
      parent: parentId,
    });

    return content;
  },
  async putDocument(id: number, editedContent: EditedContent) {
    await apiClient.put(joinWithSlash(DOCUMENTS, id), editedContent);
  },
  async deleteDocument(id: number) {
    await apiClient.delete(joinWithSlash(DOCUMENTS, id));
  },
};

export default notionApi;
