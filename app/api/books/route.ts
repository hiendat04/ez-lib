import { NextRequest, NextResponse } from "next/server";
import { getAllBooks } from "@/lib/books";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const result = await getAllBooks({ page, limit });
    
    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
    
  } catch (error) {
    console.error("API Get books error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Server error occurred",
        books: [],
        pagination: {
          currentPage: 1,
          totalPages: 0,
          totalBooks: 0,
          limit: 10
        }
      },
      { status: 500 }
    );
  }
}