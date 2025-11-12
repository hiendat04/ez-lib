import React from "react";

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  required = false,
}) => {
  const baseClasses =
    "focus:ring-primary mt-2 mb-4 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:outline-none";

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`${baseClasses} ${className}`}
      />
    </div>
  );
};

export default InputField;
