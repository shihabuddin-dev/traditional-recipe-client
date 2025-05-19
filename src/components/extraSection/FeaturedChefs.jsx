import React from "react";
import chefOmar from "../../assets/chefs/chef-omar.jpg";
import chefRina from "../../assets/chefs/chef-rina.png";
import chefYuki from "../../assets/chefs/chef-yuki.jpg";
import { FaUtensils, FaPepperHot, FaFish } from "react-icons/fa";
import Button from "../ui/Button";
import { Link } from "react-router";

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
    <section className="pt-16 pb-6 bg-gradient-to-b from-gray-50 to-white rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Our Master Chefs
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our award-winning culinary team brings world-class expertise to your
            dining experience.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {chefs.map((chef, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-xl shadow-lg overflow-hidden transition-ease-in-out duration-900 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={chef.img}
                  alt={chef.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white h-16 w-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <span className="text-2xl">{chef.icon}</span>
                  </div>
                </div>
              </div>

              <div className="pt-10 pb-8 px-6 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {chef.name}
                </h3>
                <p className="text-amber-600 font-medium mb-3">
                  {chef.specialty}
                </p>
                <p className="text-gray-600 mb-4">{chef.bio}</p>

                <div className="flex justify-center flex-wrap gap-4">
                  <Link to="/recipes">
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
