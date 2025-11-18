import Image from "next/image";
import StatusBadge from "./StatusBadge";
import { BookCardProps } from "@/types/landing";
import Link from "next/link";

const BookCard = ({
  id,
  title,
  author,
  totalCopies,
  availableCopies,
  coverImageUrl = "/landing/dummy-book-cover.jpg",
  detailLink,
}: BookCardProps) => {
  return (
    <div className="m-4 flex flex-col gap-4 rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-t-lg">
        <Image
          src={coverImageUrl}
          alt="Book title"
          fill
          className="object-cover"
        />
      </div>
      <div className="space-y-2 p-4">
        <p className="">{title}</p>
        <p className="text-gray-500">{author}</p>
        <div className="flex justify-between text-sm text-gray-600">
          <StatusBadge
            className={
              availableCopies > 0 ? "bg-green text-white" : "bg-red text-white"
            }
            text={availableCopies > 0 ? "Available" : "Unavailable"}
          />
          <p>
            {availableCopies}/{totalCopies}
          </p>
        </div>
        <Link
          href={`${detailLink}/${id}`}
          className="bg-primary hover:bg-primary/90 mt-4 inline-block w-full rounded-md px-4 py-2 text-center text-white"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};
export default BookCard;
