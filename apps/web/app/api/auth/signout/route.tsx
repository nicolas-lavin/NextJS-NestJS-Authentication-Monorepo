import { instanceProtected } from "@/lib/axios";
import { deleteSession } from "@/lib/session";
import { InstanceResponse } from "@/lib/type";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const url = `/auth/signout`;
	await instanceProtected.post<InstanceResponse<void>>(url);
	await deleteSession();
	revalidatePath("/", "layout");
	revalidatePath("/", "page");
	return NextResponse.redirect(new URL("/", req.nextUrl));
}
