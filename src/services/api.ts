import { API_ENDPOINT_URL, API_HEADER_X_USERNAME } from "../constants";

export const baseApi = async (path: string, options?: RequestInit) => {
  try {
    const response = await fetch(`${API_ENDPOINT_URL}${path}`, {
      ...options,
      headers: {
        ...options?.headers,
        "Content-Type": "application/json",
        "x-username": API_HEADER_X_USERNAME,
      },
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error(error);
  }
};
