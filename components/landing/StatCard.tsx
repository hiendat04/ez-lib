const StatCard = ({ number, text }: { number: string; text: string }) => {
  return (
    <div className="flex flex-col items-center px-8 text-center gap-2">
      <p className="text-primary text-4xl font-bold">{number}</p>
      <p className="text-primary-light">{text}</p>
    </div>
  );
};
export default StatCard;
