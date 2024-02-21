import { API_ENDPOINT_URL, API_HEADER_X_USERNAME } from "../constants";
import { createApiClient } from "../services";

const apiClient = createApiClient(API_ENDPOINT_URL, {
  headers: {
    "Content-Type": "application/json",
    "x-username": API_HEADER_X_USERNAME,
  },
});

const DOCUMENTS = "documents";

export const getAllDocuments = async () => {
  const documents = await apiClient.get(DOCUMENTS);

  return documents;
};

export const getDocumentContent = async (id: number) => {
  const content = await apiClient.get(`${DOCUMENTS}/${id}`);

  return content;
};

export const postDocument = async (
  title: string,
  parentId: number | null = null
) => {
  const content = await apiClient.post(DOCUMENTS, { title, parent: parentId });

  return content;
};

interface EditedContent {
  title: string;
  content: string;
}

export const putDocument = async (id: number, editedContent: EditedContent) => {
  await apiClient.put(`${DOCUMENTS}/${id}`, editedContent);
};

export const deleteDocument = async (id: number) => {
  await apiClient.delete(`${DOCUMENTS}/${id}`);
};
