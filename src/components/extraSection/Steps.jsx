import React, { useState } from "react";
import step1 from "../../assets/steps/1.webp";
import step2 from "../../assets/steps/2.jpg";
import step3 from "../../assets/steps/3.webp";
import step4 from "../../assets/steps/4.webp";
import step5 from "../../assets/steps/5.webp";
import step6 from "../../assets/steps/6.webp";
import step7 from "../../assets/steps/7.webp";
import step8 from "../../assets/steps/8.webp";
import step9 from "../../assets/steps/9.webp";
import step10 from "../../assets/steps/10.jpg";
import step11 from "../../assets/steps/11.webp";
import step12 from "../../assets/steps/12.webp";
import step13 from "../../assets/steps/13.jpg";
import step14 from "../../assets/steps/14.webp";
import step15 from "../../assets/steps/15.webp";
import step16 from "../../assets/steps/16.webp";
import step17 from "../../assets/steps/17.webp";
import step18 from "../../assets/steps/18.webp";
import step19 from "../../assets/steps/19.jpg";
import step20 from "../../assets/steps/20.webp";
import step21 from "../../assets/steps/21.webp";
import step22 from "../../assets/steps/22.webp";
import step23 from "../../assets/steps/23.jpg";
import step24 from "../../assets/steps/24.webp";
import step25 from "../../assets/steps/25.webp";
import step26 from "../../assets/steps/26.webp";
import step27 from "../../assets/steps/27.jpg";
import step28 from "../../assets/steps/28.webp";
import { FiZoomIn } from "react-icons/fi";
import { Fade } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";

const Steps = () => {
  const steps = [
    { img: step1, title: "Step 1", desc: "Gather fresh" },
    { img: step2, title: "Step 2", desc: "Wash and prep" },
    { img: step3, title: "Step 3", desc: "Chop and slice" },
    { img: step4, title: "Step 4", desc: "Marinate and season" },
    { img: step5, title: "Step 5", desc: "Preheat cooking tools" },
    { img: step6, title: "Step 6", desc: "Start with base" },
    { img: step7, title: "Step 7", desc: "Add spices aromatics" },
    { img: step8, title: "Step 8", desc: "Simmer or sauté" },
    { img: step9, title: "Step 9", desc: "Monitor adjust heat" },
    { img: step10, title: "Step 10", desc: "Taste adjust seasoning" },
    { img: step11, title: "Step 11", desc: "Prepare final garnishes" },
    { img: step12, title: "Step 12", desc: "Plate with care" },
    { img: step13, title: "Step 13", desc: "Add final touches" },
    { img: step14, title: "Step 14", desc: "Serve hot fresh" },
    { img: step15, title: "Step 15", desc: "Enjoy with family" },
    { img: step16, title: "Step 16", desc: "Store leftovers properly" },
    { img: step17, title: "Step 17", desc: "Clean your workspace" },
    { img: step18, title: "Step 18", desc: "Share creation online" },
    { img: step19, title: "Step 19", desc: "Teach cooking skills " },
    { img: step20, title: "Step 20", desc: "Plan next recipe" },
    { img: step21, title: "Step 21", desc: "Try new variations" },
    { img: step22, title: "Step 22", desc: "Experiment with flavors" },
    { img: step23, title: "Step 23", desc: "Document process" },
    { img: step24, title: "Step 24", desc: "Build recipe book" },
    { img: step25, title: "Step 25", desc: "Share with community" },
    { img: step26, title: "Step 26", desc: "Celebrate progress" },
    { img: step27, title: "Step 27", desc: "Collect feedback" },
    { img: step28, title: "Step 28", desc: "Repeat and master" },
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);

  // Keyboard navigation for modal
  React.useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") setSelectedIndex((i) => (i > 0 ? i - 1 : i));
      if (e.key === "ArrowRight")
        setSelectedIndex((i) => (i < steps.length - 1 ? i + 1 : i));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, steps.length]);

  return (
    <div className="container mx-auto px-4">
      <Fade direction={"up"}>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold mb-2">
            <Typewriter
              words={[
                "Our Processing",
                "Steps From",
                "Sourcing",
                "To Masterpiece",
              ]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={90}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
          <p className="mt-4 max-w-2xl mx-auto">
            From sourcing the freshest ingredients to plating your delicious
            masterpiece
          </p>
        </div>
      </Fade>
      {/* Image Grid */}
      <Fade>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
          {steps.map((step, i) => {
            const directions = ["up", "down", "left", "right"];
            const dir = directions[i % directions.length];
            return (
              <Fade key={i} direction={dir}>
                <div
                  className="relative group cursor-pointer transition-all duration-300 hover:scale-105 bg-base-500 rounded-xl shadow-lg border border-orange-400 border-dashed overflow-hidden"
                  onClick={() => setSelectedIndex(i)}
                  tabIndex={0}
                  aria-label={`View ${step.title}`}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && setSelectedIndex(i)
                  }
                >
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-32 object-cover rounded-t-xl border-b-1 border-orange-600 border-dashed"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 group-hover:bg-black group-hover:bg-opacity-20 rounded-xl transition-all duration-300 flex items-center justify-center">
                    <FiZoomIn className="text-white opacity-0 group-hover:opacity-100 text-2xl transition-all duration-300" />
                  </div>
                  <div className="p-3">
                    <div className="font-semibold text-orange-600 text-sm mb-1">
                      {step.title}
                    </div>
                    <div className="text-xs">{step.desc}</div>
                  </div>
                </div>
              </Fade>
            );
          })}
        </div>
      </Fade>

      {/* Image Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <div className="relative max-w-4xl w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4">
            <button
              className="absolute top-2 right-2 text-red-600 text-4xl font-semibold z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(null);
              }}
              aria-label="Close"
            >
              &times;
            </button>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 text-3xl text-gray-400 hover:text-orange-500 z-10 bg-white/80 dark:bg-gray-800/80 rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((i) => (i > 0 ? i - 1 : i));
              }}
              aria-label="Previous step"
              disabled={selectedIndex === 0}
            >
              &#8592;
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-3xl text-gray-400 hover:text-orange-500 z-10 bg-white/80 dark:bg-gray-800/80 rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((i) => (i < steps.length - 1 ? i + 1 : i));
              }}
              aria-label="Next step"
              disabled={selectedIndex === steps.length - 1}
            >
              &#8594;
            </button>
            <img
              src={steps[selectedIndex].img}
              alt={steps[selectedIndex].title}
              className="max-h-[70vh] w-full object-contain rounded-lg mb-4"
            />
            <div className="text-center">
              <div className="text-lg font-semibold text-orange-600 mb-1">
                {steps[selectedIndex].title}
              </div>
              <div className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                {steps[selectedIndex].desc}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Steps;
