import BookCard from "@/components/BookCard";
import Pagination from "@/components/books/Pagination";
import SearchAndFilter from "@/components/books/SearchAndFilter";
import { getAllBooksWithFilters } from "@/lib/books";
import { BrowseBooksPageProps } from "@/types/books";

const DashboardBooksPage = async ({ searchParams }: BrowseBooksPageProps) => {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const limit = parseInt(params.limit || "8");
  const search = params.search || "";
  const category = params.category || "";

  const result = await getAllBooksWithFilters({
    page,
    limit,
    search,
    category,
  });

  if (!result.success) {
    return (
      <div className="p-8">
        <h1 className="mb-2 text-2xl font-semibold text-gray-800">
          Books Catalog
        </h1>
        <p className="text-red-500">Error loading books: {result.message}</p>
      </div>
    );
  }

  const { books, pagination } = result;



  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="mb-2 text-2xl font-semibold text-gray-800">
          Books Catalog
        </h1>
        <p className="text-gray-600">
          Browse, search, and manage all books in the collection.
        </p>
      </div>

      <SearchAndFilter baseUrl="/dashboard/books" />

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {books.length} of {pagination.totalBooks}{" "}
        {pagination.totalBooks === 1 ? "book" : "books"}
      </div>

      {/* Books Grid */}
      {books.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.authors.map((author) => author.name).join(", ")}
              totalCopies={book.totalCopies}
              availableCopies={book.availableCopies}
              coverImageUrl={
                book.coverImageUrl || "/landing/dummy-book-cover.jpg"
              }
              detailLink="/dashboard/books"
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-gray-600">
            No books found matching your criteria.
          </p>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalBooks={pagination.totalBooks}
        baseUrl="/dashboard/books"
      />
    </div>
  );
};

export default DashboardBooksPage;
