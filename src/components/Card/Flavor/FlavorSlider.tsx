"use client";

import { useState } from "react";

const WineSliders = () => {
  const sliders = [
    { label: "바디감", leftLabel: "가벼워요", rightLabel: "진해요" },
    { label: "타닌", leftLabel: "부드러워요", rightLabel: "떫어요" },
    { label: "당도", leftLabel: "드라이해요", rightLabel: "달아요" },
    { label: "산미", leftLabel: "안셔요", rightLabel: "많이셔요" },
  ];

  const [values, setValues] = useState([50, 30, 40, 20]);

  const handleChange = (index: number, value: number) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  return (
    <div className="flex flex-col space-y-3 w-[480px]">
      {sliders.map((slider, index) => (
        <div key={slider.label} className="flex items-center gap-2 w-full">
          {/* 왼쪽 버튼 */}
          <div className="w-[54px] h-[25px] bg-[#F2F4F8] text-[#9FACBD] text-[14px] font-semibold flex items-center justify-center rounded-md">
            {slider.label}
          </div>

          {/* 슬라이더 영역 */}
          <div className="flex items-center justify-between w-[402px]">
            <span className="text-[16px] font-medium text-[#2D3034]">
              {slider.leftLabel}
            </span>

            <input
              type="range"
              min="0"
              max="100"
              value={values[index]}
              onChange={(e) => handleChange(index, Number(e.target.value))}
              className="w-[260px] h-[6px] appearance-none bg-[#CFDBEA] rounded-full cursor-pointer 
                         accent-[#6A42DB]
"
            />

            <span className="text-[16px] font-medium text-[#2D3034]">
              {slider.rightLabel}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WineSliders;
