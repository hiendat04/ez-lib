import { getDashboardStats } from "@/lib/dashboard";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const result = await getDashboardStats(id);

  if (result.success) {
    return NextResponse.json(result, { status: 200 });
  }

  return NextResponse.json(
    { success: false, message: result.message },
    { status: 500 },
  );
}
