"use client";

import { useState } from "react";
import TabButtons from "./components/TabButton";
import TabContent from "./components/TabContent";
import ProfileSetting from "./components/ProfileSetting";

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const reviewCount = 1;
  const wineCount = 2;

  return (
    <>
      <section className="flex flex-col gap-[20px] md:gap-[30px] lg:gap-[48px] items-start lg:items-center w-full lg:w-[25%] p-[20px] md:px-[40px] md:py-[23px] lg:px-[20px] lg:py-[28px] border border-gray-300 rounded-[16px] drop-shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
        <ProfileSetting />
      </section>
      <section className="flex flex-col w-full lg:w-[70%] gap-[30px] md:gap-[40px] lg:gap-[22px]">
        <TabButtons
          activeTab={activeTab}
          handleTabClick={handleTabClick}
          reviewCount={reviewCount}
          wineCount={wineCount}
        />
        <TabContent activeTab={activeTab} />
      </section>
    </>
  );
}
