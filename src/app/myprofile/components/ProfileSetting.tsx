import Button from "@/components/Button/button";
import { Input, InputProfileImage } from "@/components/Input";

export default function ProfileSetting() {
  return (
    <>
      <div className="flex lg:flex-col gap-[32px] md:items-center">
        <InputProfileImage />
        <div className="flex flex-col lg:items-center gap-[8px] lg:gap-[16px]">
          <h1 className="lg:text-2xl-24px-bold text-gray-800">사용자 이름</h1>
          <p className="lg:text-lg-16px-regular text-gray-500">사용자 이메일</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row lg:flex-col items-end gap-[6px] md:gap-[24px] lg:gap-[8px] w-full">
        <div className="flex flex-col gap-[8px] md:gap-[10px] w-full">
          <h2 className="text-md-14px-medium md:text-lg-16px-medium lg:text-lg-16px-medium text-gray-800">
            닉네임
          </h2>
          <Input />
        </div>
        <Button
          variant="button"
          className="h-[42px] md:h-[48px] lg:h-[42px] text-md-14px-bold md:text-lg-16px-bold lg:text-lg-16px-bold"
        >
          변경하기
        </Button>
      </div>
    </>
  );
}
