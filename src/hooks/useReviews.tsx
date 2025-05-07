import { fetchWineById } from "@/lib/api/wine";
import { useQuery } from "@tanstack/react-query";

export default function useReviews(wineId: number) {
  return useQuery({
    queryKey: ["reviews", wineId],
    queryFn: () => {
      return fetchWineById(wineId);
    },
    enabled: !!wineId,
  });
}
