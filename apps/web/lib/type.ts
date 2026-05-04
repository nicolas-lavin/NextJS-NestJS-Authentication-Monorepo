export type FormState =
	| {
			error?: {
				name?: string[];
				email?: string[];
				password?: string[];
			};
			message?: string;
	  }
	| undefined
	| null;

export type InstanceResponse<T> = {
	status: number;
	statusText: string;
	data: T;
};

export type SignInRequest = {
	email: string;
	password: string;
};

export type SignInResponse = {
	id: string;
	name: string;
	role: Role;
	accessToken: string;
	refreshToken: string;
};

export type RefreshTokenRequest = {
	refresh: string;
};

export type RefreshTokenResponse = {
	accessToken: string;
	refreshToken: string;
};

export type UpdateTokenRequest = {
	accessToken: string;
	refreshToken: string;
};

export type Profile = {
	id: string;
	name: string;
	role: Role;
};

export type Partner = {
	name: string;
	firstLastName: string;
	secondLastName: string;
	email: string;
	status: PartnerStatus;
};

export type VariantT = "success" | "error" | "info";

export enum Role {
	ADMIN = "ADMIN",
	EDITOR = "EDITOR",
	USER = "USER",
}

export enum PartnerStatus {
	ACTIVE = "ACTIVE",
	INACTIVE = "INACTIVE",
}
