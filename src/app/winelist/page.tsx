"use client";
import { useState } from "react";
import WineList from "@/components/Card/Wine/WineList";
import MonthlyChart from "@/components/Card/Monthly/MonthlyChart";
import { AuthProvider } from "@/context/AuthProvider";
import ModalFilter from "@/components/Modal/ModalFilter/ModalFilter";

export default function WinePage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<
    "RED" | "WHITE" | "SPARKLING" | "ALL"
  >("ALL");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [selectedRating, setSelectedRating] = useState<string>("all");

  return (
    <AuthProvider>
      <main className="w-full md:px-4 md:px-6">
        <div className="max-w-[1140px] mx-auto">
          {/* 이번 달 추천 와인 */}
          <section className="mt-6 bg-[#F2F4F8] rounded-lg">
            <MonthlyChart />
          </section>

          {/* 와인 리스트 */}
          <section className="mt-6 flex flex-col md:flex-row gap-6">
            <div className="w-full">
              <WineList />
            </div>
          </section>
        </div>
        {/* 필터 모달 (모바일 전용) */}
        <ModalFilter
          isOpen={isFilterOpen}
          setIsOpen={setIsFilterOpen}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
        />
      </main>
    </AuthProvider>
  );
}
