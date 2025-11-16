import { StatCardProps } from "@/types/books";
const StatCard = ({ color, title, number, Icon }: StatCardProps) => {
  return (
    <div className="mt-10 flex gap-20 rounded-md bg-white py-6 px-10 shadow-md hover:shadow-lg">
      <div className="space-y-2">
        <p className="text-primary-light text-lg">{title}</p>
        <p className={`${color} text-3xl font-medium`}>{number}</p>
      </div>
      <Icon className={color} fontSize="large" />
    </div>
  );
};
export default StatCard;
