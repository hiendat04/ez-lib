import { getAllCategory } from "@/lib/books";

export async function GET() {
  try {
    const result = await getAllCategory();

    if (result.success) {
      return new Response(JSON.stringify(result), { status: 200 });
    } else {
      return new Response(JSON.stringify(result), { status: 400 });
    }
  } catch (error) {
    console.error("API Get categories error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Server error occurred",
        categories: [],
      }),
      { status: 500 },
    );
  }
}
