import React from "react";
import pan from "../../assets/tools/pan.jpg";
import bowls from "../../assets/tools/bowls.jpg";
import knife from "../../assets/tools/knife.jpg";
import cups from "../../assets/tools/cups.jpg";
import { FaUtensils } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";

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
    <section className="bg-base-200 py-12 rounded-2xl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center mb-1">
          <FaUtensils className="text-orange-500 text-3xl" />
        </div>
        <div className="text-center mb-10">
          <Fade direction="left" triggerOnce>
            <h2 className="text-3xl md:text-4xl font-semibold mb-2">
              <Typewriter
                words={["Kitchen Essentials", "Kitchen Need"]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={90}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </h2>
          </Fade>
          <Fade direction="right" triggerOnce>
            <p className="mt-3 max-w-2xl mx-auto">
              These are the essential tools every chef relies on to create
              perfect dishes.
            </p>
          </Fade>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 text-center">
          {tools.map((tool, index) => (
            <Fade key={index} direction={index % 2 === 0 ? "left" : "up"} triggerOnce>
              <div className="relative bg-base-100 p-7 rounded-2xl shadow-sm border border-orange-200 hover:shadow-md transition group h-full flex flex-col items-center overflow-hidden">
                {/* Watermark Icon */}
                <FaUtensils className="absolute opacity-10 text-orange-300 text-[7rem] -right-4 -bottom-4 pointer-events-none select-none z-0" />
                <div className="w-28 h-28 mb-4 overflow-hidden rounded-full border-4 border-orange-400 shadow group-hover:scale-103 transition z-10 bg-white">
                  <img
                    src={tool.img}
                    alt={tool.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs uppercase tracking-wider text-orange-500 font-bold mb-1 z-10">
                  {tool.category}
                </span>
                <h4 className="font-bold text-lg mb-1 transition z-10">
                  {tool.name}
                </h4>
                <p className="text-sm text-gray-500 mb-2 flex-1 z-10">
                  {tool.description}
                </p>
                {/* Subtle hover effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-orange-100/60 to-transparent opacity-0 z-0" />
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KitchenEssentials;
