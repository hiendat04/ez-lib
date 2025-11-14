import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/lib/auth";
import { RegisterCredentials } from "@/types/auth";

export async function POST(request: NextRequest) {
  try {
    const body: RegisterCredentials = await request.json();
    
    const result = await registerUser(body);
    
    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
    
  } catch (error) {
    console.error("API Register error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Server error occurred" 
      },
      { status: 500 }
    );
  }
}