import BookCard from "@/components/BookCard";
import HeroSection from "@/components/landing/HeroSection";
import PublicHeader from "@/components/landing/PublicHeader";
import StatSection from "@/components/landing/StatSection";
export default function Home() {
  // Mock data for featured books
  // TODO: Replace with real data from backend
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
  return (
    <>
      <PublicHeader />
      <HeroSection />
      <StatSection />
      {/* Feature Books */}
      <div className="container mx-auto space-y-6 px-8 pt-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-black">Feature Books</h2>
          <p className="text-primary-light mt-6">
            Discover some of our most popular titles
          </p>
        </div>
        <div className="grid grid-cols-4">
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
        <div className="mt-8 text-center">
          <button className="bg-primary hover:bg-primary-hover cursor-pointer rounded-md px-6 py-2 font-medium text-white transition">
            Browse All Books
          </button>
        </div>
      </div>
    </>
  );
}
