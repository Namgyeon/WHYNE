import { registerKakaoOAuthApp } from "@/lib/api/oauth";
import axios from "axios";

// 카카오 로그인 처리 함수
export const signInWithKakao = async (code: string) => {
  try {
    // 여기서 `appKey`는 카카오의 REST API Key로, 환경 변수에서 불러옵니다.
    const response = await registerKakaoOAuthApp(
      process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!
    );

    // 카카오 로그인 API 호출 후, access_token과 refresh_token을 얻어오는 부분
    // 카카오는 'code'를 통해 서버에서 토큰을 발급받을 수 있습니다.
    const tokenResponse = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!, // 카카오 REST API Key
        redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!, // 카카오 리다이렉트 URI
        code: code, // 인증 코드
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // 필수 헤더 설정
        },
      }
    );
    const { access_token, refresh_token } = tokenResponse.data;

    // 로컬스토리지에 access_token과 refresh_token 저장
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);

    console.log("카카오 로그인 성공:", tokenResponse.data);

    return tokenResponse.data;
  } catch (error) {
    console.error("카카오 로그인 실패:", error);
    throw error;
  }
};
