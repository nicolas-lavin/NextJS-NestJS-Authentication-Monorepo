import { NextRequest, NextResponse } from "next/server";
import { getProfile } from "./lib/actions";
import { deleteSession } from "./lib/session";

const publicRoutes = ["/", "/auth/signin", "/auth/signup"];

export default async function middleware(req: NextRequest) {
	const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
	if (isPublicRoute) {
		return NextResponse.next();
	}

	try {
		await getProfile();
		return NextResponse.next();
	} catch (error) {
		console.error("Error fetching profile:", error);
		await deleteSession();
		return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
	}
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
