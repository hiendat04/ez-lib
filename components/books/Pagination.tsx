"use client";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalBooks: number;
  baseUrl: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  totalBooks,
  baseUrl,
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  const goToPage = (page: number) => {
    router.push(createPageURL(page));
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 mb-10 ml-20 flex items-center justify-center gap-4">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="bg-primary hover:bg-primary/90 rounded px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        Previous
      </button>

      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`rounded px-3 py-2 ${
              currentPage === page
                ? "bg-primary text-white"
                : "cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="bg-primary hover:bg-primary/90 rounded px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        Next
      </button>

      <span className="ml-4 text-gray-600">
        Showing page {currentPage} of {totalPages} ({totalBooks} total books)
      </span>
    </div>
  );
};

export default Pagination;
