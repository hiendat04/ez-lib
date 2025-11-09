import { FeatureTitleProps } from "@/types/FeatureTitleProps";

const FeatureTitle = ({ title, subtitle }: FeatureTitleProps) => {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-black">{title}</h2>
      <div className="mx-auto max-w-xl">
        <p className="text-primary-light mt-6 text-[18px]">{subtitle}</p>
      </div>
    </div>
  );
};
export default FeatureTitle;
