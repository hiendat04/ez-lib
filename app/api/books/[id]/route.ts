import { NextRequest, NextResponse } from "next/server";
import { getBookById } from "@/lib/books";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const bookId = params.id;

    const result = await getBookById(bookId);

    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 404 });
    }
  } catch (error) {
    console.error("API Get book by ID error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error occurred",
      },
      { status: 500 },
    );
  }
}
