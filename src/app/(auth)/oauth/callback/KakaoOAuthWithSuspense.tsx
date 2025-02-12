// KakaoOAuthWithSuspense.tsx
"use client"; // 클라이언트 전용

import { Suspense } from "react";
import KakaoOAuth from "./KakaoOAuth";

export default function KakaoOAuthWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KakaoOAuth />
    </Suspense>
  );
}
