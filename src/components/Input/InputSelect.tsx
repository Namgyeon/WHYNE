"use client";

import { useState } from "react";
// import Dropdown from "@/components/Dropdown";
import Icon from "@/components/Icon/Icon";

interface InputSelectProps {
  options: string[];
  selectedValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export default function InputSelect({
  options,
  selectedValue = "",
  onChange,
  className = "",
  children,
  id,
}: InputSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(selectedValue);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  const handleSelect = (value: string) => {
    setCurrentValue(value);
    if (onChange) onChange(value);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        className={`flex items-center w-full h-[42px] md:h-[48px] py-[14px] px-[20px] rounded-2xl border border-gray-300 focus:border-purple-100 focus:outline-none text-md-14px-regular md:text-lg-16px-regular text-left ${
          currentValue ? "text-gray-800" : "text-gray-500"
        }`}
        onClick={toggleDropdown}
      >
        {currentValue || children || "Select..."}
        <Icon
          name="dropdown"
          size={24}
          viewBox="0 0 24 24"
          className="absolute right-[20px] text-gray-300"
        />
      </button>

      {/* {isOpen && (
        <Dropdown
          options={options}
          onSelect={handleSelect}
          closeDropdown={closeDropdown}
        />
      )} */}
    </div>
  );
}
