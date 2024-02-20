import { API_ENDPOINT_URL, API_HEADER_X_USERNAME } from "../constants";

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

const concatUrlPath = (url: string, path: string) => {
  if (url[url.length - 1] !== "/") {
    url += "/";
  }

  if (path[0] === "/") {
    path = path.slice(1);
  }

  return `${url}${path}`;
};

type OptionBody = BodyInit | undefined | null;

const createApiClient = (url: string, options?: RequestInit) => {
  return {
    get: async (path: string) => {
      return await fetchWrapper(concatUrlPath(url, path), {
        ...options,
        method: "GET",
      });
    },
    post: async (path: string, body: OptionBody) => {
      return await fetchWrapper(concatUrlPath(url, path), {
        ...options,
        method: "POST",
        body: JSON.stringify(body),
      });
    },
    put: async (path: string, body: OptionBody) => {
      return await fetchWrapper(concatUrlPath(url, path), {
        ...options,
        method: "PUT",
        body: JSON.stringify(body),
      });
    },
    delete: async (path: string) => {
      return await fetchWrapper(concatUrlPath(url, path), {
        method: "DELETE",
      });
    },
  };
};

export const apiClient = createApiClient(API_ENDPOINT_URL, {
  headers: {
    "Content-Type": "application/json",
    "x-username": API_HEADER_X_USERNAME,
  },
});
