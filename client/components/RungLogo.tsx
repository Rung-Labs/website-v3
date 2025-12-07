import React from "react";
import logoImage from "@/assets/logo.png";

export const RungLogo: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <img
        src={logoImage}
        alt="Rung Logo"
        className="h-auto w-auto max-w-[400px]"
      />
    </div>
  );
};
