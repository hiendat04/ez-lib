import { getSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { bookId }: { bookId: string } = await request.json();
  if (!bookId) {
    return NextResponse.json({ success: false, message: "Book ID is required" }, { status: 400 });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const book = await tx.book.findUnique({ where: { id: bookId } });
      if (!book || book.availableCopies <= 0) {
        throw new Error("Book is not available for borrowing.");
      }

      const existingLoan = await tx.loan.findFirst({
        where: { bookId: bookId, userId: session.id, status: "BORROWED" },
      });
      if (existingLoan) {
        throw new Error("You have already borrowed this book.");
      }

      await tx.book.update({
        where: { id: bookId },
        data: { availableCopies: { decrement: 1 } },
      });

      const twoWeeksFromNow = new Date();
      twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);

      const newLoan = await tx.loan.create({
        data: {
          userId: session.id,
          bookId: bookId,
          dueDate: twoWeeksFromNow,
          status: "BORROWED",
        },
      });

      return newLoan;
    });

    return NextResponse.json({ success: true, loan: result }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Failed to borrow book." }, { status: 500 });
  }
}