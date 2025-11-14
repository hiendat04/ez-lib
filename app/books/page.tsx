"use client";
import BookCard from "@/components/BookCard";
import Input from "@/components/form/Input";
import InputField from "@/components/form/Input";
import FeatureLayout from "@/components/landing/FeatureLayout";
import FeatureTitle from "@/components/landing/FeatureTitle";
import PublicHeader from "@/components/landing/PublicHeader";
import Link from "next/link";
import { useState } from "react";

const BrowseBooksPage = () => {
  const [search, setSearch] = useState("");
  const books = [
    {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      totalCopies: 10,
      availableCopies: 4,
      coverImageUrl: "/landing/dummy-book-cover.jpg",
    },
    {
      id: "2",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      totalCopies: 8,
      availableCopies: 2,
      coverImageUrl: "/landing/dummy-book-cover.jpg",
    },
    {
      id: "3",
      title: "1984",
      author: "George Orwell",
      totalCopies: 5,
      availableCopies: 3,
      coverImageUrl: "/landing/dummy-book-cover.jpg",
    },
    {
      id: "4",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      totalCopies: 12,
      availableCopies: 6,
      coverImageUrl: "/landing/dummy-book-cover.jpg",
    },
    {
      id: "5",
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      totalCopies: 7,
      availableCopies: 3,
      coverImageUrl: "/landing/dummy-book-cover.jpg",
    },
    {
      id: "6",
      title: "Brave New World",
      author: "Aldous Huxley",
      totalCopies: 9,
      availableCopies: 4,
      coverImageUrl: "/landing/dummy-book-cover.jpg",
    },
    {
      id: "7",
      title: "One Hundred Years of Solitude",
      author: "Gabriel García Márquez",
      totalCopies: 11,
      availableCopies: 6,
      coverImageUrl: "/landing/dummy-book-cover.jpg",
    },
    {
      id: "8",
      title: "Lord of the Flies",
      author: "William Golding",
      totalCopies: 6,
      availableCopies: 2,
      coverImageUrl: "/landing/dummy-book-cover.jpg",
    },
  ];

  const bookCategory = [
    "Fiction",
    "Non-Fiction",
    "Science",
    "History",
    "Biography",
  ];

  const handleSearchChange = (value: string) => {
    setSearch(value);
    // TODO: Implement search functionality
  };
  return (
    <>
      <PublicHeader />
      <div className="flex flex-col items-center justify-center gap-5">
        <h2 className="mt-32 text-3xl font-semibold">Explore Our Collection</h2>
        <p className="text-primary-light text-center text-xl">
          Browse through hundreds of books across various categories. <br />
          Sign up to start borrowing!
        </p>
      </div>
      {/* Search by title or author and Select drop down category */}
      <div className="mt-10 flex w-full items-center justify-center gap-4">
        <Input
          value={search}
          label="search"
          id="search"
          placeholder="Search by title or author"
          className="max-w-xl"
          onChange={(value) => handleSearchChange(value)}
        />
        <select className="focus:border-primary w-1/9 rounded-md border border-gray-300 px-4 py-2 focus:outline-none">
          <option value="">All Categories</option>
          {bookCategory.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mx-auto mb-20 max-w-7xl">
        <div className="mt-20 grid grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              totalCopies={book.totalCopies}
              availableCopies={book.availableCopies}
              coverImageUrl={book.coverImageUrl}
            />
          ))}
        </div>
      </div>
      {/* TODO: Pagination */}
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
