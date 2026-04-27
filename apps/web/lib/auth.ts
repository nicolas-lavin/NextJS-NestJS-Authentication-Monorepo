"use server";

import { redirect } from "next/navigation";
import {
	FormState,
	InstanceResponse,
	RefreshTokenRequest,
	RefreshTokenResponse,
	SignInRequest,
	SignInResponse,
	UpdateTokenRequest,
} from "./type";
import { LoginFormSchema, SignupFormSchema } from "./schema";
import { createSession } from "./session";
import instance from "./axios";
import axios from "axios";
import { LOCAL_API_URL } from "./constants";

export const signup = async (
	state: FormState,
	formData: FormData,
): Promise<FormState> => {
	try {
		const formDataObject = Object.fromEntries(formData.entries());
		const validationFields = SignupFormSchema.safeParse(formDataObject);

		if (!validationFields.success) {
			return {
				error: validationFields.error.flatten().fieldErrors,
			};
		}

		const response = await instance.post<InstanceResponse<{ message: string }>>(
			"/auth/signup",
			validationFields.data,
		);

		redirect("/auth/signin");
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response) {
				return {
					message:
						error.response.status === 409
							? "The user is already existed!"
							: error.response.statusText,
				};
			}
		} else {
			return {
				message: "An unexpected error occurred. Please try again.",
			};
		}
	}
};

export const signIn = async (
	state: FormState,
	formData: FormData,
): Promise<FormState> => {
	try {
		const formDataObject = Object.fromEntries(formData.entries());
		const validationFields = LoginFormSchema.safeParse(formDataObject);

		if (!validationFields.success) {
			return {
				error: validationFields.error.flatten().fieldErrors,
			};
		}

		const response = await instance.post<
			SignInRequest,
			InstanceResponse<SignInResponse>
		>("/auth/signin", validationFields.data);

		const result = response.data;

		await createSession({
			user: {
				id: result.id,
				name: result.name,
				role: result.role,
			},
			accessToken: result.accessToken,
			refreshToken: result.refreshToken,
		});
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response) {
				return {
					message:
						error.response.status === 401
							? "Invalid credentials, please try again"
							: error.response.statusText,
				};
			}
		} else {
			return {
				message: "An unexpected error occurred. Please try again.",
			};
		}
	}
	redirect("/");
};

export const refreshToken = async (oldRefreshToken: string) => {
	const urlRefresh = "/auth/refresh";
	const response = await instance.post<
		RefreshTokenRequest,
		InstanceResponse<RefreshTokenResponse>
	>(urlRefresh, {
		refresh: oldRefreshToken,
	});

	if (response.status !== 201) {
		throw new Error("Failed to refresh token" + response.statusText);
	}

	const { accessToken, refreshToken } = response.data;
	const urlUpdate = `${LOCAL_API_URL}/auth/update`;

	const updateRes = await instance.post<InstanceResponse<UpdateTokenRequest>>(
		urlUpdate,
		{
			accessToken,
			refreshToken,
		},
	);

	if (updateRes.status !== 201) throw new Error("Failed to update the tokens");

	return accessToken;
};
