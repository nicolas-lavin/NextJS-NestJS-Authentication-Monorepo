"use server";

import { PartnerFormValues } from "@/app/templates/Partner/schema";
import { instanceProtected } from "./axios";
import { InstanceResponse, Profile, Partner } from "./type";

export const getProfile = async () => {
	const url = "/auth/profile";
	const response = await instanceProtected.get<InstanceResponse<Profile>>(url);
	const result = response.data;
	return result;
};

export const getPartners = async () => {
	const url = "/partner/all";
	const response = await instanceProtected.get<Partner[]>(url, {
		method: "GET",
	});
	return response.data;
};

export const createPartner = async (data: PartnerFormValues) => {
	const url = "/partner";
	const response = await instanceProtected.post<InstanceResponse<Partner>>(
		url,
		data,
	);
	const result = response.data;
	return result;
};
