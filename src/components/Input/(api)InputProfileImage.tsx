"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import getMe from "@/lib/axios"; // user get api <- api 파일 완성 후 수정해야함
import postImage from "@/lib/axios"; // image post api <- api 파일 완성 후 수정해야함
import Icon from "@/components/Icon/Icon";

export default function InputProfileImage() {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const imageUrl = await getMe();
        setImagePreview(imageUrl);
      } catch (error) {
        console.error("프로필 이미지 불러오기 실패", error);
      }
    };

    loadProfileImage();
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validExtensions = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validExtensions.includes(file.type)) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("최대 5MB 이하의 파일만 업로드 가능합니다.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    try {
      const uploadedImageUrl = await postImage(file);
      setImagePreview(uploadedImageUrl);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => imageRef.current?.click()}
      className="relative w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[164px] lg:h-[164px] rounded-full overflow-hidden border border-gray-300 cursor-pointer"
    >
      <Image
        src={imagePreview || "../../../public/images/common/no_profile.svg"}
        layout="fill"
        className="object-cover"
        alt="프로필 이미지"
      />
      {isHover && (
        <div className="flex items-center justify-center absolute inset-0 bg-purple-100 bg-opacity-30">
          <Icon
            name="photo"
            size={40}
            viewBox="0 0 24 24"
            className="text-white"
          />
        </div>
      )}
      <input
        type="file"
        ref={imageRef}
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
}
