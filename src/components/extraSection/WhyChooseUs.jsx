import React from "react";
import { FaRegSmileBeam, FaRegComments, FaRegHeart } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaRegSmileBeam className="text-amber-500 text-4xl mb-3" />,
      title: "Intuitive Navigation",
      desc: "Easily find recipes, chefs, and kitchen essentials with a clean, organized layout and clear calls to action.",
    },
    {
      icon: <FaRegComments className="text-orange-400 text-4xl mb-3" />,
      title: "Interactive Feedback",
      desc: "Like, comment, and review recipes. Get instant feedback and connect with the cooking community.",
    },
    {
      icon: <FaRegHeart className="text-pink-400 text-4xl mb-3" />,
      title: "Personalized Experience",
      desc: "Save your favorite recipes, manage your wishlist, and enjoy a personalized dashboard tailored to your tastes.",
    },
  ];

  return (
    <section className="py-14 bg-gradient-to-b from-orange-50 to-white rounded-2xl mt-10">
      <div className="max-w-5xl mx-auto px-4">
        <Fade direction="left">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-orange-600 mb-2">
            Why You'll Love This Website
          </h2>
        </Fade>
        <Fade direction="right">
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
            Designed for food lovers, by food lovers. Every feature is crafted
            to make your cooking journey enjoyable, interactive, and uniquely
            yours.
          </p>
        </Fade>
        <div className="grid md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <Fade
              key={i}
              direction={i === 0 ? "up" : i === 1 ? "down" : "right"}
            >
              <div className="bg-white rounded-2xl shadow-lg p-7 flex flex-col items-center text-center border border-orange-100 hover:shadow-2xl transition">
                {f.icon}
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
