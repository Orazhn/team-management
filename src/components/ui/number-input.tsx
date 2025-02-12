import type React from "react";
import type { ChangeEvent, KeyboardEvent } from "react";

interface NumberInputProps {
  value: string | number;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  className?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  placeholder,
  className = "",
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === "") {
      onChange("");
      return;
    }

    if (newValue.toLowerCase().includes("e")) {
      return;
    }

    const numValue = Number(newValue);
    if (
      !isNaN(numValue) &&
      numValue >= min &&
      (max === undefined || numValue <= max)
    ) {
      onChange(newValue);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() === "e") {
      e.preventDefault();
    }
  };

  return (
    <input
      type="number"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      min={min}
      max={max}
      step={step}
      placeholder={placeholder}
      className={`w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
};
