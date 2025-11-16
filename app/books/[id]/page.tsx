import FeatureLayout from "@/components/landing/FeatureLayout";
import FeatureTitle from "@/components/landing/FeatureTitle";
import PublicHeader from "@/components/landing/PublicHeader";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import StatusBadge from "@/components/StatusBadge";
import { Author } from "@prisma/client";

const BookDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  const response = await fetch(`${baseUrl}/api/books/${id}`, {
    cache: "no-store",
  }).then((res) => res.json());

  const book = response.book;

  console.log("Book detail result:", book);

  const {
    title,
    authors,
    description,
    isbn,
    publisher,
    year,
    category,
    totalCopies,
    availableCopies,
    coverImageUrl,
  } = book;

  return (
    <main className="min-h-screen">
      <PublicHeader />

      <div className="pt-24">
        <Link
          href="/books"
          className="text-primary hover:bg-accent/50 mb-4 ml-35 flex w-max items-center gap-2 rounded-md px-4 py-2 font-medium transition"
        >
          <ArrowBackIcon className="text-primary" />
          Back to Books
        </Link>

        <div className="mx-auto mt-12 mb-20 max-w-5xl rounded-lg bg-white p-12 shadow-lg">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <Image
              src={coverImageUrl || "/landing/dummy-book-cover.jpg"}
              alt="book-title"
              width={400}
              height={600}
              className="w-full rounded-lg object-cover shadow-md"
            />

            {/* Book Details Section */}
            <div className="flex flex-col space-y-6">
              {/* Title and Author */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
                <p className="mt-2 text-xl text-gray-600">
                  by {authors.map((author: Author) => author.name).join(", ")}
                </p>
              </div>

              {/* Availability Status */}
              <div className="flex items-center gap-3">
                <StatusBadge isAvailable />
                <p className="font-medium text-gray-700">
                  {availableCopies} of {totalCopies} copies available
                </p>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-lg bg-gray-100 p-4">
                <div>
                  <p className="text-primary-light text-sm font-medium">ISBN</p>
                  <p className="text-gray-800">{isbn}</p>
                </div>
                <div>
                  <p className="text-primary-light text-sm font-medium">
                    Publisher
                  </p>
                  <p className="text-gray-800">{publisher.name}</p>
                </div>
                <div>
                  <p className="text-primary-light text-sm font-medium">Year</p>
                  <p className="text-gray-800">{year || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-primary-light text-sm font-medium">
                    Category
                  </p>
                  <p className="text-gray-800">{category}</p>
                </div>
              </div>

              {/* Action Buttons */}
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

              {/* Separator */}
              <hr className="border-gray-200" />

              {/* Book Description */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  About this book
                </h2>
                <p className="mt-2 text-gray-600">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <FeatureLayout background="bg-gradient-to-r from-primary to-secondary">
          <FeatureTitle
            titleColor="text-white"
            subtitleColor="text-white"
            title="Love Reading? Join Our Community!"
            subtitle="Get unlimited access to out entire library collection"
          />
          <div className="mt-10 text-center">
            <Link
              href="/register"
              className="bg-accent hover:bg-accent/80 mr-2 cursor-pointer rounded-md px-6 py-3 font-medium text-black transition"
            >
              Create free account
            </Link>
          </div>
        </FeatureLayout>
      </div>
    </main>
  );
};
export default BookDetailPage;
