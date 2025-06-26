import React from "react";
import { Fade } from "react-awesome-reveal";
import { FaRegSmileBeam, FaLeaf, FaClock, FaStar } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

const features = [
  {
    icon: <FaRegSmileBeam className="text-orange-500 text-4xl mb-3" />,
    title: "User-Friendly",
    desc: "Easy navigation intuitive design for all ages and skill levels.",
  },
  {
    icon: <FaLeaf className="text-green-500 text-4xl mb-3" />,
    title: "Fresh Ingredients",
    desc: "Recipes focus on fresh, healthy, and seasonal ingredients.",
  },
  {
    icon: <FaClock className="text-blue-500 text-4xl mb-3" />,
    title: "Quick & Simple",
    desc: "Step-by-step instructions for delicious meals in less time.",
  },
  {
    icon: <FaStar className="text-yellow-400 text-4xl mb-3" />,
    title: "Top Rated",
    desc: "Loved by thousands of home cooks and foodies worldwide.",
  },
];

const WhyChooseUs = () => (
  <section className="py-16 bg-base-200 rounded-2xl">
    <div className="max-w-6xl mx-auto px-4 text-center">
      <Fade direction="left" triggerOnce>
        <h2 className="text-3xl md:text-4xl font-semibold mb-2">
          <Typewriter
            words={[
              " Why Choose Us?",
              "User Friendly",
              "Fresh Ingredients",
              "Quick & Simple",
              "Top Rated",
            ]}
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
        <p className="mt-3 max-w-2xl mx-auto mb-10">
          Discover what makes our platform the best place for food lovers and
          home cooks. Enjoy a seamless experience, healthy recipes, and a
          supportive community.
        </p>
      </Fade>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <Fade key={i} direction={i % 2 === 0 ? "down" : "right"} triggerOnce>
            <div
              key={i}
              className="bg-base-100 border   border-orange-200 rounded-2xl shadow-md p-8 flex flex-col items-center hover:shadow-xl transition-shadow-xs duration-800"
            >
              {f.icon}
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-sm">{f.desc}</p>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
