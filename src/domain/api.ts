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
