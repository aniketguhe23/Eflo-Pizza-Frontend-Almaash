import HeaderSection from "./HeaderSection";
import ChooseFromMenu from "../../menu/components/choose-from-menu";
import MenuSearch from "../../menu/components/menu-search";

export default function PizzaRestaurant() {
  // const featuredItems = [
  //   {
  //     id: 1,
  //     name: "7-Cheese Pizza",
  //     price: 699,
  //     image:
  //       "https://res.cloudinary.com/dnkfvkyre/image/upload/v1746989371/why_elfo_images/kld6j9ix8jchvs4yeykk.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "Tandoori Feast Pizza",
  //     price: 709,
  //     image:
  //       "https://res.cloudinary.com/dnkfvkyre/image/upload/v1746989371/why_elfo_images/kld6j9ix8jchvs4yeykk.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "Stuffed Garlic Sticks",
  //     price: 399,
  //     image:
  //       "https://res.cloudinary.com/dnkfvkyre/image/upload/v1746989371/why_elfo_images/kld6j9ix8jchvs4yeykk.jpg",
  //   },
  //   {
  //     id: 4,
  //     name: "Pizza with creamy Sauce",
  //     price: 699,
  //     image:
  //       "https://res.cloudinary.com/dnkfvkyre/image/upload/v1746989371/why_elfo_images/kld6j9ix8jchvs4yeykk.jpg",
  //   },
  // ];

  // const menuItems = [
  //   {
  //     id: 1,
  //     name: "Onion & Paneer Pizza",
  //     price: 299,
  //     description: "A Freshly cooked onions & Paneer pizza",
  //     image:
  //       "https://res.cloudinary.com/dnkfvkyre/image/upload/v1746989371/why_elfo_images/kld6j9ix8jchvs4yeykk.jpg",
  //     available: true,
  //   },
  //   {
  //     id: 2,
  //     name: "Onion & Capsicum Pizza",
  //     price: 299,
  //     description: "A Freshly cooked onions & capsicum pizza",
  //     image:
  //       "https://res.cloudinary.com/dnkfvkyre/image/upload/v1746989371/why_elfo_images/kld6j9ix8jchvs4yeykk.jpg",
  //     available: true,
  //   },
  //   {
  //     id: 3,
  //     name: "Margherita Pizza",
  //     price: 599,
  //     description: "A classic cheesy Margherita pizza",
  //     image:
  //       "https://res.cloudinary.com/dnkfvkyre/image/upload/v1746989371/why_elfo_images/kld6j9ix8jchvs4yeykk.jpg",
  //     available: true,
  //   },
  //   {
  //     id: 4,
  //     name: "Farm Fresh",
  //     price: 399,
  //     description: "A tasty farm fresh pizza",
  //     image:
  //       "https://res.cloudinary.com/dnkfvkyre/image/upload/v1746989371/why_elfo_images/kld6j9ix8jchvs4yeykk.jpg",
  //     available: false,
  //   },
  // ];

  return (
    <div className="min-h-screen bg-[#eeeeee] mt-20">
      <HeaderSection />
      <div className="bg-white">
        <MenuSearch />
        <ChooseFromMenu />
      </div>
      {/* <div className=" mx-4 p-4">
        <FeaturedItems items={featuredItems} />
        <MenuItems items={menuItems} />
      </div> */}
    </div>
  );
}
