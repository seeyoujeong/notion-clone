const getEnvVar = (key: string) => {
  if (import.meta.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }

  return import.meta.env[key];
};

export const API_ENDPOINT_URL = getEnvVar("VITE_ENDPOINT_URL");
export const API_HEADER_X_USERNAME = getEnvVar("VITE_HEADER_X_USERNAME");
