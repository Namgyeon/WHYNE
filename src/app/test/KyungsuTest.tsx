import PriceSlider from "@/components/filter/PriceSlider";
import RatingFilter from "@/components/filter/RatingFilter";
import WineTypeSelector from "@/components/filter/WineTypeSelector";
import FlavorSlider from "@/components/Card/Flavor/FlavorSlider";

export default function KyungsuTest() {
  return (
    <div className="text-gray-500">
      <div>
        <WineTypeSelector />
        <PriceSlider />
        <RatingFilter />
      </div>
      <div>
        <FlavorSlider />
      </div>
    </div>
  )
}

