"use client";

import { BorrowActionsProps } from "@/types/books";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function BorrowActions({ user, bookId }: BorrowActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleBorrow = async () => {
    if (!user) {
      toast.error("You must be logged in to borrow a book.");
      return;
    }
    setIsLoading(true);
    const toastId = toast.loading("Processing your request...");

    try {
      const response = await fetch("/api/loans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Book borrowed successfully!", { id: toastId });
        // Refresh the current page to show updated available copies
        router.refresh();
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to borrow book.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  // If a user is logged in, show the "Borrow Now" button
  if (user) {
    return (
      <div className="flex flex-col items-start gap-4 pt-4">
        <button
          onClick={handleBorrow}
          className="bg-primary hover:bg-primary/90 w-full rounded-md px-6 py-3 text-center font-semibold text-white transition"
        >
          {isLoading ? "Processing..." : "Borrow Now"}
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
