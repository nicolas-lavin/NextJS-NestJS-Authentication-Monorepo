import axios from "axios";
import { BACKEND_URL } from "./constants";
import { getSession } from "./session";
import { refreshToken } from "./auth";

export const instance = axios.create({
	baseURL: BACKEND_URL,
	headers: { "Content-Type": "application/json" },
});

export const instanceProtected = axios.create({
	baseURL: BACKEND_URL,
	headers: { "Content-Type": "application/json" },
});

instanceProtected.interceptors.request.use(
	async (request) => {
		const session = await getSession();
		if (session?.accessToken) {
			request.headers["Authorization"] = `Bearer ${session.accessToken}`;
		}
		return request;
	},
	(error) => {
		return Promise.reject(error);
	},
);

instanceProtected.interceptors.response.use(
	(response) => response, // Directly return successful responses.
	async (error) => {
		try {
			const session = await getSession(); // Retrieve the current session to access the refresh token.
			const originalRequest = error.config;
			if (
				error.response?.status === 401 &&
				!originalRequest._retry &&
				session?.refreshToken
			) {
				originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
				try {
					// Make a request to your auth server to refresh the token.
					const newAccessToken = await refreshToken(session.refreshToken);
					instanceProtected.defaults.headers.common["Authorization"] =
						`Bearer ${newAccessToken}`;
					return instanceProtected(originalRequest); // Retry the original request with the new access token.
				} catch (refreshError) {
					return Promise.reject(refreshError);
				}
			}
		} catch (error) {
			return Promise.reject(error); // For all other errors, return the error as is.
		}
		return Promise.reject(error);
	},
);

export default instance;
