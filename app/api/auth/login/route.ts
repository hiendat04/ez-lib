import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/lib/auth";
import { LoginCredentials } from "@/types/auth";

export async function POST(request: NextRequest) {
  try {
    const body: LoginCredentials = await request.json();
    setTimeout(() => {}, 100000);

    const result = await loginUser(body);

    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 401 });
    }
  } catch (error) {
    console.error("API Login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error occurred",
      },
      { status: 500 },
    );
  }
}
