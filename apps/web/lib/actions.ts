"use server";

import { instanceProtected } from "./axios";
import { InstanceResponse, Profile } from "./type";

export const getProfile = async () => {
	const url = "/auth/profile";
	const response = await instanceProtected.get<InstanceResponse<Profile>>(url);
	const result = response.data;
	return result;
};
