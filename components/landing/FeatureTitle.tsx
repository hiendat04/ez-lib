import { FeatureTitleProps } from "@/types/landing";

const FeatureTitle = ({
  title,
  subtitle,
  titleColor,
  subtitleColor,
}: FeatureTitleProps) => {
  return (
    <div className="text-center">
      <h2
        className={`text-4xl ${titleColor ? titleColor : "text-black"} font-bold`}
      >
        {title}
      </h2>
      <div className="mx-auto max-w-2xl">
        <p
          className={` ${subtitleColor ? subtitleColor : "text-primary-light"} mt-6 text-[18px]`}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
};
export default FeatureTitle;
