"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon/Icon";

type Wine = {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  avgRating: number;
  reviewCount: number;
  recentReview?: {
    content: string;
  };
};

// ✅ props로 wine 데이터를 받아오기
export default function WineCard({ wine }: { wine: Wine }) {
  const router = useRouter();

  return (
    <div
      className="w-[343px] h-[full] sm:w-[704px] sm:h-[full] xl:w-[800px] rounded-[16px] border border-[#CFDBEA] bg-white flex flex-col md:p-6 cursor-pointer hover:shadow-md transition relative z-0"
      onClick={() => router.push(`/winelist/${wine.id}`)}
    >
      {/* ✅ 상단: 와인 정보 */}
      <div className="flex">
        {/* ✅ 와인 이미지 */}
        <div className="w-[70px] h-[208px] min-w-[60px] ml-[20px] mt-[30px] md:ml-[36px]">
          <Image
            src={wine.image}
            alt={wine.name}
            width={60}
            height={208}
            quality={100}
            unoptimized={true}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="ml-[36px] mt-[30px] sm:mt-[36.5px] md:ml-[81px] flex flex-col md:flex-col md:justify-between w-full">
          <div className="">
            {/* ✅ 와인 이름과 국가 */}
            <h2 className="text-[#2D3034] md:w-[300px] font-semibold text-[20px] md:text-[32px] leading-[26px] md:leading-[42px] w-full break-words whitespace-normal">
              {wine.name}
            </h2>
            <p className="text-[#9FACBD] font-normal text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] pt-[8px] sm:pt-[20px] md:pt-[8px]">
              {wine.region}
            </p>

            {/* ✅ 가격 (md에서 국가 아래로 이동) */}
            <div className="bg-[#F1EDFC] w-fit px-[10px] py-[2.5px] sm:py-2 rounded-lg flex items-center self-start sm:mt-4">
              <span className="text-[#6A42DB] font-bold text-[14px] sm:text-[18px] leading-[24px] whitespace-nowrap">
                ₩ {wine.price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* ✅ 평점 + 별점 + 후기 개수 */}
          <div className="flex items-start pt-[22px] gap-2 md:items-center sm:flex-col sm:mb-[50px] sm:absolute sm:left-[80%] sm:bottom-[31%] md:bottom-[28%] text-left">
            {/* ✅ 평점 */}
            <span className="text-black font-bold text-[28px] sm:text-[48px] pt-[10px] leading-[24px] sm:mb-[10px] text-left">
              {wine.avgRating.toFixed(1)}
            </span>

            {/* ✅ 별점 + 후기 개수 그룹 */}
            <div className="flex flex-col items-start">
              <div className="flex sm:mb-[10px]">
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={index}
                    className={`text-lg ${index < Math.floor(wine.avgRating) ? "text-purple-600" : "text-gray-300"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-gray-500 text-xs md:text-sm text-left w-full">
                {wine.reviewCount}개의 후기
              </span>
            </div>

            {/* ✅ 화살표 아이콘 */}
            <div className="w-[36px] h-[36px] pt-[20px] ml-[36px] flex items-center justify-center text-gray-400 text-[24px]">
              <Icon
                name="right"
                size={32}
                className="cursor-pointer scale-125"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ 절취선 */}
      <div className="border-t border-gray-200 mt-4"></div>

      {/* ✅ 최신 후기 */}
      <div className="w-[303px] lg:w-[680px] mt-[7px] lg:mt-[19.5px] mx-[20px] lg:mx-[60px]">
        <h3 className="text-black font-semibold text-[16px] leading-[26px] mb-[10px]">
          최신 후기
        </h3>
        <p className="text-[#9FACBD] text-[16px] leading-[26px] break-words whitespace-pre-wrap h-auto">
          {wine.recentReview?.content || "아직 후기가 없습니다."}
        </p>
      </div>
    </div>
  );
}
