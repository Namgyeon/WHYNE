"use client";

import { useState } from "react";
import Icon from "@/components/Icon/Icon";

interface InputSearchProps {
  searchByKeyword: (keyword?: string) => void;
}

export default function InputSearch({ searchByKeyword }: InputSearchProps) {
  const [keyword, setKeyword] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);

    if (newKeyword.trim() === "") {
      searchByKeyword();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchByKeyword(keyword.trim());
    }
  };

  const handleCancelButton = () => {
    setKeyword("");
    searchByKeyword();
  };

  const handleSearchClick = () => {
    searchByKeyword(keyword.trim());
  };

  return (
    <div className="flex items-center relative">
      <Icon
        name="search"
        size={24}
        viewBox="0 0 24 24"
        onClick={handleSearchClick}
        className="absolute left-[15px] md:left-[20px] cursor-pointer text-gray-500"
      />
      <input
        value={keyword}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="와인을 검색해 보세요"
        className="w-full h-[38px] md:h-[48px] py-[14px] px-[15px] md:px-[20px] pl-[40px] md:pl-[50px] border rounded-[50px] border-gray-300 text-md-14px-medium md:text-lg-16px-medium placeholder:text-md-14px-regular placeholder:md:text-lg-16px-regular placeholder:text-gray-500 focus:text-md-14px-regular focus:md:text-lg-16px-regular focus:border-purple-100 focus:outline-none"
      />
      {keyword && (
        <button
          onClick={handleCancelButton}
          className="absolute right-[15px] md:right-[20px]"
        >
          <Icon
            name="close"
            size={24}
            viewBox="0 0 24 24"
            className="text-gray-300"
          />
        </button>
      )}
    </div>
  );
}
