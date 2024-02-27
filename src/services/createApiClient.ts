import { joinWithSlash } from "@/utils";

const fetchWrapper = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, options);

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("fetchWrapper: ", error);
  }
};

type OptionBody = Object | undefined | null;

const createApiClient = (url: string, options?: RequestInit) => {
  return {
    async get<T>(path: string): Promise<T> {
      return await fetchWrapper(joinWithSlash(url, path), {
        ...options,
        method: "GET",
      });
    },
    async post<T>(path: string, body: OptionBody): Promise<T> {
      return await fetchWrapper(joinWithSlash(url, path), {
        ...options,
        method: "POST",
        body: JSON.stringify(body),
      });
    },
    async put<T>(path: string, body: OptionBody): Promise<T> {
      return await fetchWrapper(joinWithSlash(url, path), {
        ...options,
        method: "PUT",
        body: JSON.stringify(body),
      });
    },
    async delete<T>(path: string): Promise<T> {
      return await fetchWrapper(joinWithSlash(url, path), {
        ...options,
        method: "DELETE",
      });
    },
  };
};

export default createApiClient;
