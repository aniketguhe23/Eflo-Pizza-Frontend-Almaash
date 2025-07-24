import { useHomeStore } from "@/app/store/homeStore";
import SpecialtyItem from "./specialty-item";
import SpecialtyItem2 from "./specialty-item2";

export default function SpecialtiesSection() {
  const { data } = useHomeStore();

  return (
    <div className="py-10 px-4 sm:px-6 md:px-12 flex flex-col items-center text-black pt-20">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-14 md:mb-20 [font-family:'Antonio',Helvetica] text-center">
        {data?.speciality1_subtitle ?? "SPECIALITIES"}
      </h2>

      <div className="max-w-7xl w-full space-y-8 sm:space-y-10">
        <SpecialtyItem2
          image={
            data?.speciality1_card1_img ?? "/garlicbread.jpg"
          }
          title={
            data?.speciality1_card1_title ?? "GARLIC BREAD CRUSTS ON ALL PIZZAS."
          }
          description={
            data?.speciality1_card1_subtitle ??
            "Golden crispy crusts brushed with rich garlic butter sauce, baked to perfection and packed with irresistible flavor"
          }
        />
        <SpecialtyItem
          image={
            data?.speciality1_card2_img ?? "/pinkkk.jpg"
          }
          title={
            data?.speciality1_card2_title ?? "PINK AND YELLOW LEMONADES."
          }
          description={
            data?.speciality1_card2_subtitle ??
            "Savour the bold, sweet-tart flavour of our Pink Lemonade - a perfect companion for any meal"
          }
        />
      </div>
    </div>
  );
}
