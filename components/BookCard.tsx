import Image from "next/image";
import StatusBadge from "./StatusBadge";
import { BookCardProps } from "@/types/landing";

const BookCard = ({
  title,
  author,
  totalCopies,
  availableCopies,
  coverImageUrl = "/landing/dummy-book-cover.jpg",
}: BookCardProps) => {
  return (
    <div className="m-4 flex cursor-pointer flex-col gap-4 rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
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
          <StatusBadge isAvailable />
          <p>
            {availableCopies}/{totalCopies}
          </p>
        </div>
        <p className="bg-primary hover:bg-primary-hover mt-5 cursor-pointer rounded-md px-4 py-2 text-center font-medium text-white">
          View Details
        </p>
      </div>
    </div>
  );
};
export default BookCard;
