"use client";

import { BorrowActionsProps } from "@/types/books";
import Link from "next/link";

export default function BorrowActions({ user, bookId }: BorrowActionsProps) {
  const handleBorrow = () => {
    // TODO: Implement the logic to borrow the book
    console.log(`User ${user?.id} is borrowing book ${bookId}`);
    alert("Borrow functionality not yet implemented.");
  };

  // If a user is logged in, show the "Borrow Now" button
  if (user) {
    return (
      <div className="flex flex-col items-start gap-4 pt-4">
        <button
          onClick={handleBorrow}
          className="bg-primary hover:bg-primary/90 w-full rounded-md px-6 py-3 text-center font-semibold text-white transition"
        >
          Borrow Now
        </button>
        <p className="w-full text-center text-sm text-gray-500">
          Welcome, {user.fullName}!
        </p>
      </div>
    );
  }

  // If no user, show the sign-up and login links
  return (
    <div className="flex flex-col items-start gap-4 pt-4">
      <Link
        href="/register"
        className="bg-primary hover:bg-primary/90 w-full rounded-md px-6 py-3 text-center font-semibold text-white transition"
      >
        Sign up to Borrow
      </Link>
      <Link
        href="/login"
        className="text-primary w-full text-center text-sm hover:underline"
      >
        Already have an account?
      </Link>
    </div>
  );
}
