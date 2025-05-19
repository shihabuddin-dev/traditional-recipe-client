import React from "react";
import pan from "../../assets/tools/pan.jpg";
import bowls from "../../assets/tools/bowls.jpg";
import knife from "../../assets/tools/knife.jpg";
import cups from "../../assets/tools/cups.jpg";

const KitchenEssentials = () => {
  const tools = [
    { name: "Mixing Bowls", img: bowls },
    { name: "Non-stick Pan", img: pan },
    { name: "Measuring Cups", img: cups },
    { name: "Chef’s Knife", img: knife },
  ];

  return (
    <section className="bg-orange-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Kitchen Essentials for Perfect Recipes
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 text-center">
          {tools.map((tool, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <img
                src={tool.img}
                alt={tool.name}
                className="h-32 w-full object-cover rounded mb-3"
              />
              <h4 className="font-semibold">{tool.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KitchenEssentials;
