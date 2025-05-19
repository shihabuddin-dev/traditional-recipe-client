import React from "react";
import HeroSlider from "../../components/hero/HeroSlider";
import FeaturedChefs from "../../components/extraSection/FeaturedChefs";
import KitchenEssentials from "../../components/extraSection/KitchenEssentials";
import Steps from "../../components/extraSection/Steps";

const Home = () => {
  return (
    <div className="space-y-12 md:space-y-16">
      <HeroSlider />
      <Steps />
      <KitchenEssentials />
      <FeaturedChefs />
    </div>
  );
};

export default Home;
