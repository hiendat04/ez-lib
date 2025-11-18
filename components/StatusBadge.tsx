import { clsx } from "clsx";

interface StatusBadgeProps {
  text: string;
  className?: string;
}

const StatusBadge = ({ text, className }: StatusBadgeProps) => {
  return (
    <span
      className={clsx(
        "inline-flex w-max items-center rounded-full px-3 py-1 text-sm font-medium",
        className,
      )}
    >
      {text}
    </span>
  );
};

export default StatusBadge;
