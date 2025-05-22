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

const Steps = () => {
  const steps = [
    { img: step1, title: "Step 1" },
    { img: step2, title: "Step 2" },
    { img: step3, title: "Step 3" },
    { img: step4, title: "Step 4" },
    { img: step5, title: "Step 5" },
    { img: step6, title: "Step 6" },
    { img: step7, title: "Step 7" },
    { img: step8, title: "Step 8" },
    { img: step9, title: "Step 9" },
    { img: step10, title: "Step 10" },
    { img: step11, title: "Step 11" },
    { img: step12, title: "Step 12" },
    { img: step13, title: "Step 13" },
    { img: step14, title: "Step 14" },
    { img: step15, title: "Step 15" },
    { img: step16, title: "Step 16" },
    { img: step17, title: "Step 17" },
    { img: step18, title: "Step 18" },
    { img: step19, title: "Step 19" },
    { img: step20, title: "Step 20" },
    { img: step21, title: "Step 21" },
    { img: step22, title: "Step 22" },
    { img: step23, title: "Step 23" },
    { img: step24, title: "Step 24" },
    { img: step25, title: "Step 25" },
    { img: step26, title: "Step 26" },
    { img: step27, title: "Step 27" },
    { img: step28, title: "Step 28" },
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="container mx-auto px-4">
      <Fade direction={'up'}>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold mb-2">
            Our Process Steps
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
                  className="relative group cursor-pointer transition-all duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(step.img)}
              >
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-32 object-fit rounded-lg shadow-md"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-300 flex items-center justify-center">
                    <FiZoomIn className="text-white opacity-0 group-hover:opacity-100 text-2xl transition-all duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent px-2 py-1 rounded-b-lg">
                    <p className="text-white text-xs font-medium">{step.title}</p>
                  </div>
                </div>
              </Fade>
            );
          })}
        </div>
      </Fade>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              className="absolute top-0 md:-top-0 right-5 sm:right-52 text-red-600 text-4xl font-semibold"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="max-h-[90vh] w-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Steps;
