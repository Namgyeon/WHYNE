import { fetchWineById } from "@/lib/api/wine";
import Image from "next/image";

// 1. id 값으로 get요청을 하여 와인의 데이터를 받아와 보여준다.
// 2. 페이지에서 데이터 캐시를 하고 prop으로 데이터를 넘겨주는 방법.

export default async function CardDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const wine = await fetchWineById(id);
  const { image, name, region, price } = wine;

  return (
    <div className="max-w-1120 w-full">
      <Image src={image} alt="와인 이미지" width={58} height={230} />
      <div>
        <p>{name}</p>
        <p>{region}</p>
        <p>{`₩ ${price}`}</p>
      </div>
    </div>
  );
}
