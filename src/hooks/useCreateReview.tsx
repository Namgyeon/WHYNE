import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "@/lib/api/review";

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

export default function useCreateReview(wineId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewData: CreateReviewPayload) => createReview(reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", wineId],
      });
    },
  });
}
