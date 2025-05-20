import React from "react";
import pan from "../../assets/tools/pan.jpg";
import bowls from "../../assets/tools/bowls.jpg";
import knife from "../../assets/tools/knife.jpg";
import cups from "../../assets/tools/cups.jpg";
import { FaUtensils } from "react-icons/fa";

const KitchenEssentials = () => {
  const tools = [
    {
      name: "Mixing Bowls",
      img: bowls,
      category: "Prep Tools",
      description: "Set of 3 stainless steel mixing bowls",
    },
    {
      name: "Non-stick Pan",
      img: pan,
      category: "Cookware",
      description: "10-inch ceramic non-stick frying pan",
    },
    {
      name: "Measuring Cups",
      img: cups,
      category: "Baking Essentials",
      description: "Precision nested measuring cups set",
    },
    {
      name: "Chef's Knife",
      img: knife,
      category: "Cutlery",
      description: "8-inch professional chef's knife",
    },
  ];

  return (
    <section className="bg-orange-50 py-12 rounded-2xl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center mb-1">
          <FaUtensils className="text-orange-500 text-3xl" />
        </div>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
            Kitchen Essentials
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            These are the essential tools every chef relies on to create perfect
            dishes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 text-center">
          {tools.map((tool, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <img
                src={tool.img}
                alt={tool.name}
                className="h-32 w-full object-cover rounded mb-3"
              />
              <span className="text-sm text-orange-600 block mb-1">
                {tool.category}
              </span>
              <h4 className="font-semibold mb-2">{tool.name}</h4>
              <p className="text-sm text-gray-600">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KitchenEssentials;
