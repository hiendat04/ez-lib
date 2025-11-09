import { StepCardProps } from "@/types/StepCardProps";

const StepCard = ({ step, stepName, stepDetails }: StepCardProps) => {
  let bgColor;
  switch (step) {
    case 1:
      bgColor = "bg-primary";
      break;
    case 2:
      bgColor = "bg-secondary";
      break;
    case 3:
      bgColor = "bg-accent";
      break;
  }
  return (
    <div className="text-center">
      <div
        className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full ${bgColor} text-white`}
        style={{ fontSize: "1.5rem", fontWeight: 600 }}
      >
        {step}
      </div>
      <h3 className="mb-3">{stepName}</h3>
      <p className="text-primary-light">{stepDetails}</p>
    </div>
  );
};
export default StepCard;
