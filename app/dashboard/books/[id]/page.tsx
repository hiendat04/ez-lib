import BorrowActions from "@/components/books/BorrowActions";
import StatusBadge from "@/components/StatusBadge";
import { getSession } from "@/lib/auth";
import { Author } from "@/types/books";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import Link from "next/link";

const DashboardBookDetailsPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = await params;
  const session = await getSession();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  const response = await fetch(`${baseUrl}/api/books/${id}`, {
    cache: "no-store",
  }).then((res) => res.json());

  const {
    title,
    authors,
    coverImageUrl,
    isbn,
    publisher,
    year,
    category,
    description,
    availableCopies,
    totalCopies,
  } = response.book;

  return (
    <main className="min-h-screen">
      <Link
        href="/dashboard/books"
        className="text-primary hover:bg-accent/50 mt-10 mb-4 ml-35 flex w-max items-center gap-2 rounded-md px-4 py-2 font-medium transition"
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
              <StatusBadge
                className={
                  availableCopies > 0
                    ? "bg-green text-white"
                    : "bg-red text-white"
                }
                text={availableCopies > 0 ? "Available" : "Unavailable"}
              />
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
                <p className="text-gray-800">{year || "N/A"}</p>
              </div>
              <div>
                <p className="text-primary-light text-sm font-medium">
                  Category
                </p>
                <p className="text-gray-800">{category}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <BorrowActions user={session} bookId={id} />

            {/* Separator */}
            <hr className="border-gray-200" />

            {/* Book Description */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                About this book
              </h2>
              <p className="mt-2 text-gray-600">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default DashboardBookDetailsPage;
