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

const DOCUMENTS = "documents";

export const getAllDocuments = async () => {
  const documents = await apiClient.get<RootDocument[]>(DOCUMENTS);

  return documents;
};

export const getDocumentContent = async (id: number) => {
  const content = await apiClient.get<DocumentContent>(
    joinWithSlash(DOCUMENTS, id)
  );

  return content;
};

export const postDocument = async (
  title: string,
  parentId: number | null = null
) => {
  const content = await apiClient.post<ResponsePostDocument>(DOCUMENTS, {
    title,
    parent: parentId,
  });

  return content;
};

interface EditedContent {
  title: string;
  content: string;
}

export const putDocument = async (id: number, editedContent: EditedContent) => {
  await apiClient.put(joinWithSlash(DOCUMENTS, id), editedContent);
};

export const deleteDocument = async (id: number) => {
  await apiClient.delete(joinWithSlash(DOCUMENTS, id));
};
