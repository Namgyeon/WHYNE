import CardDetail from "@/components/Card/CardDetail";

export default function WineDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      와인 상세 페이지입니다.
      <CardDetail params={params} />
    </div>
  );
}
