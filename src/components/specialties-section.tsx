import SpecialtyItem from "./specialty-item";
import SpecialtyItem2 from "./specialty-item2";

export default function SpecialtiesSection() {
  return (
    <div className="py-8 px-4 md:px-12 flex flex-col items-center text-black">
      <h2 className="text-5xl font-bold mb-8 [font-family:'Antonio',Helvetica]">
        SPECIALITIES
      </h2>

      <div className="max-w-7xl w-full space-y-6">
        <SpecialtyItem2
          image="/garlicbread.jpg"
          title="GARLIC BREAD CRUSTS ON ALL PIZZAS."
          description="Golden crispy crusts brushed with rich garlic butter sauce, baked to perfection and packed with irresistible flavor"
        />
        <SpecialtyItem
          image="/pinkkk.jpg"
          title="PINK AND YELLOW LEMONADES."
          description="Savour the bold, sweet-tart flavour of our Pink Lemonade - a perfect companion for any meal"
        />
      </div>
    </div>
  );
}
