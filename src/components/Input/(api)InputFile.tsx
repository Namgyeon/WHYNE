"use client";

import Img from "next/image";
import { useState, useEffect, ChangeEvent } from "react";
import postImage from "@/lib/axios"; // image post api <- api 파일 완성 후 수정해야함
import Icon from "@/components/Icon/Icon";

interface InputFileProps {
  id: string;
  name: string;
  value: string | null;
  onChange: (name: string, value: string | null) => void;
}

export default function InputFile({
  id,
  name,
  value,
  onChange,
}: InputFileProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      alert("파일 크기는 5MB 이하만 업로드할 수 있습니다.");
      return;
    }

    setIsUploading(true);

    try {
      const imageUrl = await postImage(file);
      onChange(name, imageUrl);
      setPreview(imageUrl);
    } catch (error) {
      alert("이미지 업로드에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    onChange(name, null);
    setPreview(null);
  };

  return (
    <div className="flex w-full gap-2">
      <label
        htmlFor={id}
        className="flex items-center justify-center w-[120px] md:w-[140px] h-[120px] md:h-[140px] border border-gray-300 rounded-2xl cursor-pointer hover:bg-purple-100 hover:opacity-30"
      >
        {/* {isUploading ? "업로드 중..." : (<Icon name=""/>)} */}
      </label>
      <input
        id={id}
        type="file"
        name={name}
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />
      {preview && (
        <div className="relative w-[120px] md:w-[140px] h-[120px] md:h-[140px] border border-gray-300 rounded-2xl overflow-hidden">
          <Img src={preview} alt="미리보기" fill className="object-contain" />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute w-[24px] h-[24px] top-[6px] right-[6px]"
          >
            <Icon
              name="close"
              size={24}
              viewBox="0 0 24 24"
              className="text-gray-300 w-full h-full"
            />
          </button>
        </div>
      )}
    </div>
  );
}
