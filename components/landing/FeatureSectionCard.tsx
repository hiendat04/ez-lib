import { FeatureSectionCardProps } from "@/types/FeatureSectionCardProps";

const FeatureSectionCard = ({
  icon: Icon,
  title,
  description,
}: FeatureSectionCardProps) => {
  return (
    <div className="flex w-full gap-5 rounded-lg border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg border-2">
      <div className="bg-gray-200 flex h-13 w-40 items-center justify-center rounded-lg">
        <Icon fontSize="large" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">{title}</h3>
        <p className="text-primary-light">{description}</p>
      </div>
    </div>
  );
};
export default FeatureSectionCard;
