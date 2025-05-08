"use client";
import Button from "@/components/Button/button";
import ModalReviewFlavor from "./ModalReviewFlavor";
import ModalReviewRate from "./ModalReviewRate";
import ModalReviewSmell from "./ModalReviewSmell";
import ModalReviewHeader from "./ModalReviewHeader";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchWineById } from "@/lib/api/wine";
import { fetchReviewById, updateReview } from "@/lib/api/review";
import { AxiosError } from "axios";
import { showToast } from "@/components/Toast/Toast";
import useCreateReview from "@/hooks/useCreateReview";

interface ReviewData {
  rating: number; // 평점
  lightBold: number; // 바디감
  smoothTannic: number; // 타닌
  drySweet: number; // 당도
  softAcidic: number; // 산미
  aroma: string[]; // 향
  content: string; // 내용
}

interface CreateReviewPayload extends ReviewData {
  wineId: number;
}

type ModalReviewFormProps = {
  onClose: () => void;
  onSuccess: (newReviewId: number) => void;
  initialReviewId?: number;
  initialWineId?: number;
};

export default function ModalReviewForm({
  onClose,
  onSuccess,
  initialReviewId,
  initialWineId,
}: ModalReviewFormProps) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [reviewId, setReviewId] = useState<number | null>(
    initialReviewId ?? null
  );

  // ✅ `initialWineId`가 있으면 바로 사용, 없으면 `null`
  const [wineId, setWineId] = useState<number | null>(initialWineId ?? null);

  const [wine, setWine] = useState<{
    id: number;
    name: string;
    image: string;
  }>({
    id: 0,
    name: "",
    image: "",
  });
  const [values, setValues] = useState<{
    rating: number;
    content: string;
    lightBold: number;
    smoothTannic: number;
    drySweet: number;
    softAcidic: number;
    aroma: string[];
    wineId: number;
  }>({
    rating: 0,
    content: "",
    lightBold: 0,
    smoothTannic: 0,
    drySweet: 0,
    softAcidic: 0,
    aroma: [],
    wineId: 0,
  });

  const { mutate: createMutate } = useCreateReview(wineId ?? 0);

  const { id } = useParams();
  const paramWineId = Array.isArray(id) ? id[0] : id; //변수중복 방지

  // 버튼 비활성화
  const disabled = !(values.rating && values.content);

  // ✅ `initialWineId`가 있으면 바로 설정
  useEffect(() => {
    if (initialWineId) {
      setWineId(initialWineId);
    } else if (paramWineId) {
      setWineId(Number(paramWineId)); // ✅ paramWineId를 wineId로 설정
    }
  }, [initialWineId, paramWineId]);

  const fetchReviewData = useCallback(
    async (reviewId: number) => {
      if (!reviewId || !isEditMode) return;
      try {
        const response = await fetchReviewById(reviewId);

        setValues((prev) => ({
          ...prev,
          rating: response.rating,
          content: response.content,
          lightBold: response.lightBold,
          smoothTannic: response.smoothTannic,
          drySweet: response.drySweet,
          softAcidic: response.softAcidic,
          aroma: response.aroma,
          wineId: response.wineId ?? prev.wineId, // ✅ 기존 wineId 유지
        }));

        if (!initialWineId) {
          setWineId(response.wineId);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(
            "수정하기 위해 기존 리뷰데이터 불러오기 실패:",
            error.response?.data
          );
        }
      }
    },
    [isEditMode, initialWineId]
  );

  // `reviewId`가 변경될 때 기존 리뷰 데이터를 가져옴
  useEffect(() => {
    if (reviewId && isEditMode) {
      fetchReviewData(reviewId);
    }
  }, [reviewId, isEditMode, fetchReviewData]);

  // `wineId`가 존재할 경우에만 `fetchWineById` 실행
  useEffect(() => {
    const fetchWine = async () => {
      try {
        if (!wineId || wineId === 0) {
          return;
        }
        const response = await fetchWineById(Number(wineId));
        setWine({
          id: response.id,
          name: response.name,
          image: response.image,
        });
      } catch (error) {
        console.error("❌ 와인 데이터를 가져오는 중 오류 발생:", error);
      }
    };
    if (wineId) fetchWine(); // wineId가 있을 때만 실행
  }, [wineId]);

  useEffect(() => {
    if (reviewId && isEditMode) {
      fetchReviewData(reviewId);
    }
  }, [reviewId, isEditMode, fetchReviewData]);

  // `initialReviewId`가 있으면 수정 모드 활성화
  useEffect(() => {
    if (initialReviewId) {
      setReviewId(initialReviewId);
      setIsEditMode(true);
    }
  }, [initialReviewId]);

  // 리뷰 저장 & 수정 API 요청
  const onSubmit = async () => {
    if (!wine.id || wine.id === 0) {
      alert("와인 정보를 불러오는 중입니다. 잠시만 기다려 주세요.");
      return;
    }
    const reviewData: CreateReviewPayload = {
      rating: values.rating,
      lightBold: values.lightBold,
      smoothTannic: values.smoothTannic,
      drySweet: values.drySweet,
      softAcidic: values.softAcidic,
      aroma: values.aroma,
      content: values.content,
      wineId: values.wineId,
    };

    if (!isEditMode) {
      reviewData.wineId = Number(wine.id);
    }

    try {
      if (isEditMode) {
        // 수정 요청 PATCH
        const updated = await updateReview(reviewId!, reviewData);
        showToast("리뷰가 수정되었습니다.", "success");
        onClose();
        onSuccess(updated.id);
      }
      if (!isEditMode && reviewData.wineId !== undefined) {
        createMutate(reviewData, {
          onSuccess: (res) => {
            showToast("리뷰가 성공적으로 등록되었습니다.", "success");
            onClose();
            onSuccess(res.id);
          },
        });
      }
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
      if (error instanceof AxiosError) {
        showToast("리뷰 등록에 실패했습니다", "error");
      }
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <ModalReviewHeader isEditMode={isEditMode} onClose={onClose} />
      <ModalReviewRate
        rating={values.rating}
        setRating={(rating) => setValues((prev) => ({ ...prev, rating }))}
        content={values.content}
        setContent={(content) => setValues((prev) => ({ ...prev, content }))}
        name={wine.name}
        image={wine.image}
      />
      <ModalReviewFlavor
        lightBold={values.lightBold}
        setLightBold={(lightBold) =>
          setValues((prev) => ({ ...prev, lightBold }))
        }
        smoothTannic={values.smoothTannic}
        setSmoothTannic={(smoothTannic) =>
          setValues((prev) => ({ ...prev, smoothTannic }))
        }
        drySweet={values.drySweet}
        setDrySweet={(drySweet) => setValues((prev) => ({ ...prev, drySweet }))}
        softAcidic={values.softAcidic}
        setSoftAcidic={(softAcidic) =>
          setValues((prev) => ({ ...prev, softAcidic }))
        }
      />
      <ModalReviewSmell
        aroma={values.aroma}
        setAroma={(aroma) => setValues((prev) => ({ ...prev, aroma }))}
      />
      <Button
        disabled={disabled}
        onClick={onSubmit}
        size="lg"
        className="w-full"
      >
        {isEditMode ? "리뷰 수정하기" : "리뷰 남기기"}
      </Button>
    </div>
  );
}
