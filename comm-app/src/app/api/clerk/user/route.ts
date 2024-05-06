import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  const userId: string = req.nextUrl.searchParams.get("userId") || "";

  const user = await clerkClient.users.getUser(userId);

  if (!user) {
    return NextResponse.json("User not found", { status: 500 });
  }

  return NextResponse.json(
    { username: user.username, image: user.imageUrl },
    { status: 200 }
  );
}
