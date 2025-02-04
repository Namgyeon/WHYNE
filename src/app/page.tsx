import styles from "./page.module.css";
import WineTypeSelector from "@/components/Button/filter/WineTypeSelector";
import PriceSlider from "@/components/Button/filter/PriceSlider";
import RatingFilter from "@/components/Button/filter/RatingFilter";

export default function Home() {
  return (
    <div>
      <WineTypeSelector />
      <PriceSlider />
      <RatingFilter />
    </div>
  );
}
