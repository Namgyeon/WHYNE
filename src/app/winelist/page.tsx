"use client";

import WineList from "@/components/Card/Wine/WineList";
import MonthlyChart from "@/components/Card/Monthly/MonthlyChart";
import { AuthProvider } from "@/context/AuthProvider";

export default function WinePage() {
  return (
    <AuthProvider>
      <main>
        <div className="w-[1140px] mx-auto">
          {/* 이번 달 추천 와인 */}
          <section className="w-[1140px] mt-6 bg-[#F2F4F8] p-4 rounded-lg">
            <MonthlyChart />
          </section>

          {/* 필터링 + 와인 리스트 */}
          <section className="mt-6 flex gap-10">
            {/* ✅ 필터 포함된 WineList 컴포넌트 */}
            <div className="w-3/4">
              <WineList />
            </div>
          </section>
        </div>
      </main>
    </AuthProvider>
  );
}
