import Image from "next/image";
import StatusBadge from "./StatusBadge";

const BookCard = () => {
  return (
    <div className="m-4 flex flex-col gap-4 rounded-lg bg-white shadow-md hover:shadow-lg cursor-pointer transition-shadow">
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-t-lg">
        <Image
          src="/landing/dummy-book-cover.jpg"
          alt="Book title"
          fill
          className="object-cover"
        />
      </div>
      <div className="space-y-2 p-4">
        <p className="">The Song Of Achilles</p>
        <p className="text-gray-500">Harper Lee</p>
        <div className="flex justify-between text-sm text-gray-600">
          <StatusBadge isAvailable/>
          <p>2/5</p>
        </div>
        <p className="bg-primary mt-5 cursor-pointer rounded-md px-4 py-2 text-center font-medium text-white hover:bg-primary-hover">
          View Details
        </p>
      </div>
    </div>
  );
};
export default BookCard;
