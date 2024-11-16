import { getSession } from "./session";

export const authFetch = async (url: string, options: RequestInit = {}) => {
  const session = await getSession();

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${session?.accessToken}`,
  };

  let response = await fetch(url, options);
};
