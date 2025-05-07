import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import RewardsBanner from "@/components/rewards-banner";
import PopularDishes from "@/components/popular-dishes";
import SpecialtiesSection from "@/components/specialties-section";
import FeaturedSlider from "@/components/featured-slider";
import WhyAtElfos from "@/components/why-ate-elfos";
import Footer from "@/components/footer";
import FoodDeliveryHero from "@/components/food-delivery";

export default function Home() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/elephantPointers.png')", // Replace with your image path
      }}
    >
      <Header />
      <HeroSection />
      <RewardsBanner />
      <PopularDishes />
      <SpecialtiesSection />
      <FeaturedSlider />
      <WhyAtElfos />
      <div className="relative z-10 -mb-52 p-30">
      <FoodDeliveryHero />
      </div>
      <Footer />
    </main>
  );
}
