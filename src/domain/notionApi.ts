import { API_ENDPOINT_URL, API_HEADER_X_USERNAME } from "@/constants";
import { createApiClient } from "@/services";
import { DocumentContent, ResponsePostDocument, RootDocument } from "@/types";
import { addIsToggledToDocuments, joinWithSlash } from "@/utils";
import { toggledStorage } from ".";

const notionApiClient = createApiClient(API_ENDPOINT_URL, {
  headers: {
    "Content-Type": "application/json",
    "x-username": API_HEADER_X_USERNAME,
  },
});

type EditedContent = Pick<DocumentContent, "title" | "content">;

const DOCUMENTS = "documents";

const notionApi = {
  async getAllDocuments() {
    const documents = await notionApiClient.get<RootDocument[]>(DOCUMENTS);
    const convertedDocuments = addIsToggledToDocuments(
      documents,
      toggledStorage.getIdList()
    );

    return convertedDocuments;
  },
  async getDocumentContent(id: number) {
    const content = await notionApiClient.get<DocumentContent>(
      joinWithSlash(DOCUMENTS, id)
    );

    return content;
  },
  async postDocument(title: string, parentId: number | null = null) {
    const content = await notionApiClient.post<ResponsePostDocument>(
      DOCUMENTS,
      {
        title,
        parent: parentId,
      }
    );

    return content;
  },
  async putDocument(id: number, editedContent: EditedContent) {
    await notionApiClient.put(joinWithSlash(DOCUMENTS, id), editedContent);
  },
  async deleteDocument(id: number) {
    await notionApiClient.delete(joinWithSlash(DOCUMENTS, id));
  },
};

export default notionApi;
