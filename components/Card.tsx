import { ReactNode } from "react";
import { clsx } from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={clsx("rounded-lg bg-white p-6 shadow-md", className)}>
      {children}
    </div>
  );
};

export default Card;