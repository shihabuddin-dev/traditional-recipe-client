import React from "react";
import { useLoaderData } from "react-router";

const RecipeDetails = () => {
  const recipe = useLoaderData();

  if (!recipe) return <p className="text-center text-2xl">Recipe not found!</p>;

  const {
    image,
    title,
    cuisine,
    categories,
    preparationTime,
    ingredients,
    instructions,
    likes,
  } = recipe;

  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* Banner Image */}
      <div className="mb-8">
        <img
          src={image}
          alt={title}
          className="w-full h-[300px] md:h-[400px] object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Title & Cuisine */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {title}
        </h1>
        <p className="text-gray-600 text-lg">{cuisine} Cuisine</p>
      </div>

      {/* Metadata: Time, Categories, Likes */}
      <div className="flex flex-wrap gap-4 mb-6">
        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
          ⏱ {preparationTime} min
        </span>
        {categories.map((cat, idx) => (
          <span
            key={idx}
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
          >
            {cat}
          </span>
        ))}
        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
          ❤️ {likes} Likes
        </span>
      </div>

      {/* Ingredients */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Ingredients
        </h2>
        <p className="text-gray-700 leading-relaxed">{ingredients}</p>
      </div>

      {/* Instructions */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Instructions
        </h2>
        <p className="text-gray-700 leading-relaxed">{instructions}</p>
      </div>
    </div>
  );
};

export default RecipeDetails;
