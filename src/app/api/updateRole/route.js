import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(request) {
  const { userId, role } = await request.json();

  if (!userId || !role) {
    return NextResponse.json({ error: "Missing userId or role" }, { status: 400 });
  }

  try {
    await clerkClient.users?.updateUserMetadata(userId, {
      publicMetadata: { role },
    });

    return NextResponse.json({ success: true, message: "Role updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating role:", error);
    return NextResponse.json({ success: false, message: "Failed to update role" }, { status: 500 });
  }
}

