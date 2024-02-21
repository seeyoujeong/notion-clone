import { API_ENDPOINT_URL, API_HEADER_X_USERNAME } from "../constants";
import { createApiClient } from "../services";

const apiClient = createApiClient(API_ENDPOINT_URL, {
  headers: {
    "Content-Type": "application/json",
    "x-username": API_HEADER_X_USERNAME,
  },
});

export const getAllDocuments = async () => {
  const documents = await apiClient.get("documents");

  return documents;
};
