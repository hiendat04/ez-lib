"use client";
import BookCard from "@/components/BookCard";
import Input from "@/components/form/Input";
import FeatureLayout from "@/components/landing/FeatureLayout";
import FeatureTitle from "@/components/landing/FeatureTitle";
import PublicHeader from "@/components/landing/PublicHeader";
import Loading from "@/components/Loading";
import { Author } from "@/types/books";
import { Book } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

const BrowseBooksPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalBooks: 0,
    limit: 10,
  });

  const fetchBooks = async (page = 1, limit = 8) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/books?page=${page}&limit=${limit}`);
      const data = await response.json();

      if (data.success) {
        setBooks(data.books);
        setPagination(data.pagination);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Failed to fetch books");
      console.error("Fetch books error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`/api/books/categories`);
      const data = await response.json();

      if (data.success) {
        // Handle categories if needed
        setCategories(data.categories);
      } else {
        console.error("Failed to fetch categories:", data.message);
      }
    } catch (error) {
      console.error("Fetch categories error:", error);
    }
  };

  // Call the API when component mounts
  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <>
        <PublicHeader />
        <div className="mt-32 text-center">
          <Loading text="Loading Books ..." />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <PublicHeader />
        <div className="mt-32 text-center text-red-500">{error}</div>
      </>
    );
  }

  console.log({ categories, searchValue });

  return (
    <>
      <PublicHeader />
      <div className="flex flex-col items-center justify-center gap-5">
        <h2 className="mt-32 text-3xl font-semibold">Explore Our Collection</h2>
        <p className="text-primary-light text-center text-xl">
          Browse through {pagination.totalBooks} books across various
          categories. <br />
          Sign up to start borrowing!
        </p>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-4xl items-center justify-center gap-4">
        <Input
          label="search"
          id="search"
          placeholder="Search by title or author"
          value={searchValue}
          onChange={setSearchValue}
          className="max-w-md flex-1"
        />
        <select className="focus:ring-primary mt-2 mb-4 max-w-[12] cursor-pointer rounded-md border border-gray-300 p-2 focus:ring-2 focus:outline-none">
          <option value="">All Categories</option>
          {categories.map((category: string) => (
            <option key={category} value={category} className="cursor-pointer">
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="mx-auto max-w-7xl px-8">
        <div className="mt-20 grid grid-cols-4">
          {books.map((book: Book & { author: Author }) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author?.name}
              totalCopies={book.totalCopies}
              availableCopies={book.availableCopies}
              coverImageUrl={book.imageUrl ?? "/landing/dummy-book-cover.jpg"}
            />
          ))}
        </div>
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
