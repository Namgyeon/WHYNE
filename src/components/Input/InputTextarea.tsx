"use client";

import { ChangeEvent, useState } from "react";

interface InputTextareaProps {
  placeholder?: string;
  className?: string;
  id?: string;
}

export default function InputTextarea({ id }: InputTextareaProps) {
  const [content, setContent] = useState<string>("");
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <textarea
      id={id}
      value={content}
      onChange={handleContentChange}
      placeholder="후기를 작성해 주세요"
      className={`w-full h-[100px] md:h-[120px] rounded-[16px] border border-gray-300 focus:border-purple-100 focus:outline-none py-[14px] px-[20px] text-md-14px-regular md:text-lg-16px-regular text-black placeholder:text-gray-500`}
    />
  );
}
