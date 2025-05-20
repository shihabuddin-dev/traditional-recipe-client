import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";

const TopRecipes = () => {
  const [topRecipes, setTopRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/recipes/top") // Your backend API
      .then((res) => res.json())
      .then((data) => {
        setTopRecipes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching top recipes:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        🔥 Top Recipes
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading recipes...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRecipes.map((recipe) => (
            <Recipe key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopRecipes;
