import React from "react";
import chefOmar from "../../assets/chefs/chef-omar.jpg";
import chefRina from "../../assets/chefs/chef-rina.png";
import chefYuki from "../../assets/chefs/chef-yuki.jpg";
import { FaUtensils, FaPepperHot, FaFish } from "react-icons/fa";
import Button from "../ui/Button";
import { Link } from "react-router";
import { Typewriter } from "react-simple-typewriter";
import { Fade } from "react-awesome-reveal";

const FeaturedChefs = () => {
  const chefs = [
    {
      name: "Chef Yuki",
      specialty: "Japanese Delicacies",
      img: chefYuki,
      icon: <FaFish className="text-blue-600" />,
      bio: "Sushi master trained in Tokyo's finest restaurants.",
    },
    {
      name: "Chef Omar",
      specialty: "Middle Eastern Dishes",
      img: chefOmar,
      icon: <FaPepperHot className="text-red-600" />,
      bio: "Bringing traditional Levantine recipes with a modern twist.",
    },

    {
      name: "Chef Rina",
      specialty: "Italian Cuisine",
      img: chefRina,
      icon: <FaUtensils className="text-yellow-600" />,
      bio: "Master of authentic Italian flavors with 15 years experience in Tuscany.",
    },
  ];

  return (
    <section className="pt-16 pb-2 bg-base-100 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Fade direction="left">
            <h2 className="text-3xl md:text-4xl font-semibold mb-2">
              Meet Our:-{" "}
              <span>
                <Typewriter
                  words={["Master Chefs", "Popular Chefs", "Expert Chefs"]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={90}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </span>
            </h2>
          </Fade>
          <Fade direction="right">
            <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
            <p className="mt-4 max-w-2xl mx-auto">
              Our award-winning culinary team brings world-class expertise to
              your dining experience.
            </p>
          </Fade>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {chefs.map((chef, idx) => (
            <div
              key={idx}
              className="group border border-orange-200 border-dashed bg-base-500 rounded-xl shadow-lg overflow-hidden transition-transform duration-500 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={chef.img}
                  alt={chef.name}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white h-16 w-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <span className="text-2xl transition-transform duration-500 group-hover:-translate-y-1">
                      {chef.icon}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-10 pb-8 px-6 text-center">
                <h3 className="text-2xl font-bold mb-1">{chef.name}</h3>
                <p className="text-amber-600 font-medium mb-3">
                  {chef.specialty}
                </p>
                <p className="mb-4">{chef.bio}</p>

                <div className="flex justify-center flex-wrap gap-4">
                  <Link to="/all-recipes">
                    <Button variant="secondary">View Recipes</Button>
                  </Link>
                  <Button variant="none">Book Session</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedChefs;
