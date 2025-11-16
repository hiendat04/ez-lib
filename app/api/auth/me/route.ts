import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getSession();

    if (user) {
      return NextResponse.json({ user }, { status: 200 });
    }

    return NextResponse.json({ user: null }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
