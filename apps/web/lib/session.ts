"use server";

import { jwtVerify, SignJWT, decodeJwt } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Role } from "./type";

export type Session = {
	user: {
		id: string;
		name: string;
		role: Role;
	};
	accessToken: string;
	refreshToken: string;
};

const encodedKey = new TextEncoder().encode(process.env.SECRET_KEY);
export async function createSession(payload: Session) {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	const cookieStore = await cookies();

	const session = await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("7d")
		.sign(encodedKey);

	cookieStore.set("session", session, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production" ? true : false,
		expires: expiresAt,
		sameSite: "lax",
		path: "/",
	});
}

export async function getSession() {
	const cookieStore = await cookies();
	const sessionCookie = cookieStore.get("session")?.value;
	if (!sessionCookie) return null;
	try {
		const { payload } = await jwtVerify(sessionCookie, encodedKey, {
			algorithms: ["HS256"],
		});

		return payload as Session;
	} catch (error) {
		console.log("ERROR IN SESSION: ", error);
		throw new Error("Invalid session");
	}
}

export async function deleteSession() {
	const cookieStore = await cookies();
	cookieStore.delete("session");
}

export async function updateTokens({
	accessToken,
	refreshToken,
}: {
	accessToken: string;
	refreshToken: string;
}) {
	const cookieStore = await cookies();
	const cookie = cookieStore.get("session")?.value;
	if (!cookie) return null;

	const { payload } = await jwtVerify<Session>(cookie, encodedKey);

	if (!payload) throw new Error("Session not found");

	const newPayload: Session = {
		user: {
			...payload.user,
		},
		accessToken,
		refreshToken,
	};

	await createSession(newPayload);
}
