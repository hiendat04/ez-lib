import { getSession } from "@/lib/auth";
import { LoanStatus, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(
    request: Request,
    context: { params: Promise<{ userId: string }> }, 
  ) {
    try {
      const { userId } = await context.params; 
      const session = await getSession();
  
      if (!session || session.id !== userId) {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 },
        );
      }
  
      const { searchParams } = new URL(request.url);
      const status = searchParams.get("status");
  
      const whereClause: any = { userId: userId };
  
      if (status === "active") {
        whereClause.status = { in: [LoanStatus.BORROWED, LoanStatus.LATE] };
      } else if (status === "history") {
        whereClause.status = { in: [LoanStatus.RETURNED, LoanStatus.CANCELLED] };
      }
  
      const loans = await prisma.loan.findMany({
        where: whereClause,
        include: {
          book: {
            select: {
              title: true,
              // Change 'authors' to 'bookAuthors' to match your schema
              bookAuthors: { 
                select: {
                  author: { // Then select the author from the join table
                    select: {
                      name: true, // And finally, the author's name
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: { checkOutDate: "desc" },
      });
  
      return NextResponse.json({ success: true, loans });
    } catch (error) {
      console.error("GET Loans Error:", error);
      return NextResponse.json(
        { success: false, message: "Failed to fetch loans." },
        { status: 500 },
      );
    }
  }


export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  const { loanId }: { loanId: string } = await request.json();

  try {
    const result = await prisma.$transaction(async (tx) => {
      const loan = await tx.loan.findFirst({
        where: {
          id: loanId,
          userId: session.id,
          status: { in: [LoanStatus.BORROWED, LoanStatus.LATE] },
        },
      });

      if (!loan) {
        throw new Error("Loan not found or already returned.");
      }

      const updatedLoan = await tx.loan.update({
        where: { id: loanId },
        data: { status: "RETURNED", returnDate: new Date() },
      });

      await tx.book.update({
        where: { id: loan.bookId },
        data: { availableCopies: { increment: 1 } },
      });

      return updatedLoan;
    });

    return NextResponse.json({ success: true, loan: result });
  } catch (error: any) {
    console.error("PUT Loan Error:", error); 
    return NextResponse.json(
      { success: false, message: error.message || "Failed to return book." },
      { status: 500 },
    );
  }
}