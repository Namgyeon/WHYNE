"use client";

type FlavorSliderProps = {
  lightBold: number;
  setLightBold: (value: number) => void;
  smoothTannic: number;
  setSmoothTannic: (value: number) => void;
  drySweet: number;
  setDrySweet: (value: number) => void;
  softAcidic: number;
  setSoftAcidic: (value: number) => void;
};

export default function FlavorSlider({
  lightBold,
  setLightBold,
  smoothTannic,
  setSmoothTannic,
  drySweet,
  setDrySweet,
  softAcidic,
  setSoftAcidic,
}: FlavorSliderProps) {
  const sliders = [
    { label: "바디감", leftLabel: "가벼워요", rightLabel: "진해요" },
    { label: "타닌", leftLabel: "부드러워요", rightLabel: "떫어요" },
    { label: "당도", leftLabel: "드라이해요", rightLabel: "달아요" },
    { label: "산미", leftLabel: "안셔요", rightLabel: "많이셔요" },
  ];

  // props로 받은 상태값을 배열 형태로 정리 (순서 유지)
  const values = [lightBold, smoothTannic, drySweet, softAcidic];

  // 각 슬라이더의 setter 함수를 매핑
  const setters = [setLightBold, setSmoothTannic, setDrySweet, setSoftAcidic];

  const handleChange = (index: number, value: number) => {
    // 해당하는 setter 함수 호출하여 상태 업데이트
    setters[index](value);
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
                         accent-[#6A42DB]"
            />

            <span className="text-[16px] font-medium text-[#2D3034]">
              {slider.rightLabel}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
