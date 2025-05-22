import React from "react";
import HeroSlider from "../../components/hero/HeroSlider";
import FeaturedChefs from "../../components/extraSection/FeaturedChefs";
import KitchenEssentials from "../../components/extraSection/KitchenEssentials";
import Steps from "../../components/extraSection/Steps";
import TopRecipes from "../../components/recipes/TopRecipes";

const Home = () => {
  return (
    <div className="min-h-screen space-y-12 md:space-y-16 bg-base-100 text-base-content">
      <HeroSlider />
      <TopRecipes />
      <Steps />
      <KitchenEssentials />
      <FeaturedChefs />
    </div>
  );
};

export default Home;
