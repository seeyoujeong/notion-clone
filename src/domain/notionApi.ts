import { API_ENDPOINT_URL, API_HEADER_X_USERNAME } from "@/constants";
import { createApiClient } from "@/services";
import { DocumentContent, ResponsePostDocument, RootDocument } from "@/types";
import { addIsToggledToDocuments, joinWithSlash } from "@/utils";
import { toggleStateManager, documentListStateManager } from ".";

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
    try {
      const documents = await notionApiClient.get<RootDocument[]>(DOCUMENTS);

      const convertedDocuments = addIsToggledToDocuments(
        documents,
        toggleStateManager.getIdList()
      );

      return convertedDocuments;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        const documents = documentListStateManager.getDocumentList();

        const convertedDocuments = addIsToggledToDocuments(
          documents,
          toggleStateManager.getIdList()
        );

        return convertedDocuments;
      }

      return [];
    }
  },
  async getDocumentContent(id: number) {
    try {
      const content = await notionApiClient.get<DocumentContent>(
        joinWithSlash(DOCUMENTS, id)
      );

      return content;
    } catch (error) {
      const content = documentListStateManager.getDocumentContent(id);

      return content;
    }
  },
  async postDocument(title: string, parentId: number | null = null) {
    try {
      const content = await notionApiClient.post<ResponsePostDocument>(
        DOCUMENTS,
        {
          title,
          parent: parentId,
        }
      );

      return content;
    } catch (error) {
      const content = documentListStateManager.addDocument(title, parentId);

      return content;
    }
  },
  async putDocument(id: number, editedContent: EditedContent) {
    try {
      await notionApiClient.put(joinWithSlash(DOCUMENTS, id), editedContent);
    } catch (error) {
      documentListStateManager.updateDocument(id, editedContent);
    }
  },
  async deleteDocument(id: number) {
    try {
      await notionApiClient.delete(joinWithSlash(DOCUMENTS, id));
    } catch (error) {
      documentListStateManager.deleteDocument(id);
    }
  },
};

export default notionApi;
