"use client";

import { useState } from "react";

const WineTypeSelector = ({ selectedType, setSelectedType }: { selectedType?: string; setSelectedType?: (type: string) => void }) => {
  // ✅ 내부 상태 추가 (부모가 안 넘겨주면 이걸 사용)
  const [localSelectedType, setLocalSelectedType] = useState("White");

  // ✅ 부모가 값을 넘겨주면 사용하고, 안 넘기면 내부 상태 사용
  const actualSelectedType = selectedType ?? localSelectedType;
  const actualSetSelectedType = setSelectedType ?? setLocalSelectedType;

  const buttons = [
    { label: "Red", width: "w-[65px]", border: "rounded-tl-full" },
    { label: "White", width: "w-[79px]", border: "" },
    { label: "Sparkling", width: "w-[105px]", border: "rounded-tr-full" },
  ];

  return (
    <div className="flex flex-col items-start space-y-2">
      <div className="w-[120px] h-[32px] text-[20px] leading-[32px] font-bold text-gray-800" style={{ fontFamily: "Pretendard" }}>
        WINE TYPES
      </div>
      <div className="flex space-x-2">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => actualSetSelectedType(btn.label)}
            className={`h-[42px] px-[18px] py-[10px] border border-[#CFDBEA] ${btn.width} ${btn.border} rounded-full 
              ${actualSelectedType === btn.label ? "bg-[#6A42DB] text-white" : "bg-white text-black"}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WineTypeSelector;
