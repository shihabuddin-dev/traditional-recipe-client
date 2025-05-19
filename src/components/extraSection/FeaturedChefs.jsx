import React from "react";
import chefOmar from "../../assets/chefs/chef-omar.jpg";
import chefRina from "../../assets/chefs/chef-rina.png";
import chefYuki from "../../assets/chefs/chef-yuki.jpg";

const FeaturedChefs = () => {
  const chefs = [
    { name: "Chef Rina", specialty: "Italian Cuisine", img: chefRina },
    { name: "Chef Omar", specialty: "Middle Eastern Dishes", img: chefOmar },
    { name: "Chef Yuki", specialty: "Japanese Delicacies", img: chefYuki },
  ];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-center mb-8">
          Meet Our Featured Chefs
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {chefs.map((chef, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg shadow">
              <img
                src={chef.img}
                alt={chef.name}
                className="rounded-full h-32 w-32 mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">{chef.name}</h3>
              <p className="text-gray-600">{chef.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedChefs;
