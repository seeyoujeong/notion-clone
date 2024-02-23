import { joinWithSlash } from "../utils";

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

export const createApiClient = (url: string, options?: RequestInit) => {
  return {
    get: async <T>(path: string): Promise<T> => {
      return await fetchWrapper(joinWithSlash(url, path), {
        ...options,
        method: "GET",
      });
    },
    post: async <T>(path: string, body: OptionBody): Promise<T> => {
      return await fetchWrapper(joinWithSlash(url, path), {
        ...options,
        method: "POST",
        body: JSON.stringify(body),
      });
    },
    put: async <T>(path: string, body: OptionBody): Promise<T> => {
      return await fetchWrapper(joinWithSlash(url, path), {
        ...options,
        method: "PUT",
        body: JSON.stringify(body),
      });
    },
    delete: async <T>(path: string): Promise<T> => {
      return await fetchWrapper(joinWithSlash(url, path), {
        ...options,
        method: "DELETE",
      });
    },
  };
};
