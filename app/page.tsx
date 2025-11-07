import BookCard from "@/components/BookCard";
import HeroSection from "@/components/landing/HeroSection";
import PublicHeader from "@/components/landing/PublicHeader";
import StatSection from "@/components/landing/StatSection";
export default function Home() {
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
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
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
