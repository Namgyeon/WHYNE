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
  wineId: number; // 와인id
}

export default function useCreateReview() {
  const queryClient = useQueryClient();

  const uploadReviewMutation = useMutation({
    mutationFn: (reviewData: ReviewData) => createReview(reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries;
    },
  });
}
