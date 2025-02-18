"use client";

import { X } from "lucide-react";
import WineTypeSelector from "@/components/filter/WineTypeSelector";
import PriceSlider from "@/components/filter/PriceSlider";
import RatingFilter from "@/components/filter/RatingFilter";

interface ModalFilterProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedType: "RED" | "WHITE" | "SPARKLING" | "ALL";
  setSelectedType: React.Dispatch<
    React.SetStateAction<"RED" | "WHITE" | "SPARKLING" | "ALL">
  >;
  minPrice: number;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  maxPrice: number;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  selectedRating: string;
  setSelectedRating: React.Dispatch<React.SetStateAction<string>>;
}

const ModalFilter: React.FC<ModalFilterProps> = ({
  isOpen,
  setIsOpen,
  selectedType,
  setSelectedType,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedRating,
  setSelectedRating,
}) => {
  const handleReset = () => {
    setSelectedType("ALL");
    setMinPrice(0);
    setMaxPrice(1000000);
    setSelectedRating("all");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center md:hidden z-50">
      <div className="bg-white w-[90%] max-w-[375px] p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">필터</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <WineTypeSelector
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
        <hr className="my-4 border-gray-200" />
        <PriceSlider
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />
        <hr className="my-4 border-gray-200" />
        <RatingFilter
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
        />

        <div className="flex justify-between mt-6">
          <button
            onClick={handleReset}
            className="w-1/4 py-3 bg-[#F2F4F8] text-[#6A42DB] rounded-lg mr-2"
          >
            초기화
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="w-3/4 py-3 bg-[#6A42DB] text-white rounded-lg"
          >
            필터 적용하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalFilter;
