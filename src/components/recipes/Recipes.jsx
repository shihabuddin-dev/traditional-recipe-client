import React from "react";
import { Link, useLoaderData } from "react-router";
import Recipe from "./Recipe";
import Button from "../ui/Button";

const Recipes = () => {
  const InitialRecipes = useLoaderData();
  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
          Top Recipes
        </h2>
        <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          description will be added
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {InitialRecipes.map((recipe) => (
          <Recipe ipe key={recipe._id} recipe={recipe} />
        ))}
      </div>
      <Link to="/recipes" className="flex justify-center mt-6">
        <Button variant="outline" className="py-2">
          See All Recipes
        </Button>
      </Link>
    </div>
  );
};

export default Recipes;
