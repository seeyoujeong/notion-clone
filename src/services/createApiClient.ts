import { joinWithSlash } from "@/utils";

const FETCH_TIMEOUT = 100;

const fetchWithTimeout = async (url: string, options?: RequestInit) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    throw error;
  }
};

const fetchWrapper = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetchWithTimeout(url, options);

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw error;
    } else {
      console.error("fetchWrapper: ", error);
    }
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
