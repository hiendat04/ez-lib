import React from "react";

const FeatureLayout = ({
  children,
  background = "bg-background",
}: {
  children: React.ReactNode;
  background: string;
}) => {
  return (
    <div
      className={`space-y-6 px-50 py-18 ${background ? background : ""}`}
    >
      {children}
    </div>
  );
};
export default FeatureLayout;
