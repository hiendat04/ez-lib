import BookCard from "@/components/BookCard";
import Pagination from "@/components/books/Pagination";
import SearchAndFilter from "@/components/books/SearchAndFilter";
import FeatureLayout from "@/components/landing/FeatureLayout";
import FeatureTitle from "@/components/landing/FeatureTitle";
import PublicHeader from "@/components/landing/PublicHeader";

import { getAllBooksWithFilters } from "@/lib/books";
import { Author, Book, BrowseBooksPageProps } from "@/types/books";
import Link from "next/link";

const BrowseBooksPage = async ({ searchParams }: BrowseBooksPageProps) => {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const limit = parseInt(params.limit || "8");
  const search = params.search || "";
  const category = params.category || "";

  // Fetch books with filters
  const result = await getAllBooksWithFilters({
    page,
    limit,
    search,
    category,
  });

  if (!result.success) {
    return (
      <>
        <PublicHeader />
        <div className="flex flex-col items-center justify-center gap-5">
          <h2 className="mt-32 text-3xl font-semibold">Error loading books</h2>
          <p className="text-red-500">{result.message}</p>
        </div>
      </>
    );
  }

  const { books, pagination } = result;

  return (
    <>
      <PublicHeader />
      <div className="flex flex-col items-center justify-center gap-5">
        <h2 className="mt-32 text-3xl font-semibold">Explore Our Collection</h2>
        <p className="text-primary-light text-center text-xl">
          Browse through {pagination.totalBooks} books across various
          categories. <br />
          {search && <span>Search results for: &quot;{search}&quot;</span>}
          {category && <span>Category: {category}</span>}
        </p>
      </div>

      <SearchAndFilter />

      <div className="mx-auto max-w-7xl px-8">
        {books.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book: Book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.authors
                  .map((author: Author) => author.name)
                  .join(", ")}
                totalCopies={book.totalCopies}
                availableCopies={book.availableCopies}
                coverImageUrl={
                  book.coverImageUrl || "/landing/dummy-book-cover.jpg"
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-600">
              No books found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalBooks={pagination.totalBooks}
        />
      </div>

      <FeatureLayout background="bg-gradient-to-r from-primary to-secondary">
        <FeatureTitle
          titleColor="text-white"
          subtitleColor="text-white"
          title="Ready To Start Borrowing"
          subtitle="Create a free account to borrow books and manage your reading journey"
        />
        <div className="mt-10 text-center">
          <Link
            href="/register"
            className="bg-accent hover:bg-accent/80 mr-2 cursor-pointer rounded-md px-6 py-3 font-medium text-black transition"
          >
            Sign up now
          </Link>
          <Link
            href="/login"
            className="ml-4 cursor-pointer rounded-md border-2 border-white bg-white/10 px-6 py-3 font-medium text-white transition hover:bg-white/20"
          >
            Sign in
          </Link>
        </div>
      </FeatureLayout>
    </>
  );
};

export default BrowseBooksPage;
