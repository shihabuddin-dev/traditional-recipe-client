import React, { useState, useMemo } from "react";
import Recipe from "../../components/recipes/Recipe";
import Button from "../../components/ui/Button";
import { useLoaderData } from "react-router";

const AllRecipes = () => {
  const initialRecipes = useLoaderData();
  const [recipes, setRecipes] = useState(initialRecipes);
  const [showAll, setShowAll] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState("All");

  // Extract unique cuisine types
  const cuisineTypes = useMemo(() => {
    const types = initialRecipes.map((r) => r.cuisine);
    return ["All", ...Array.from(new Set(types))];
  }, [initialRecipes]);

  // Handle like update
  const handleLikeUpdate = (id) => {
    setRecipes((prev) => {
      const updated = prev.map((r) =>
        r._id === id ? { ...r, likes: r.likes + 1 } : r
      );
      return [...updated].sort((a, b) => b.likes - a.likes);
    });
  };

  // Apply cuisine filter
  const filteredRecipes =
    selectedCuisine === "All"
      ? recipes
      : recipes.filter((r) => r.cuisine === selectedCuisine);

  const visibleRecipes = showAll
    ? filteredRecipes
    : filteredRecipes.slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
          Our All Recipes
        </h2>
        <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Discover our all recipes, filtered by cuisine type and ranked by
          likes.
        </p>
      </div>

      {/* Dropdown Filter */}
      <div className="flex justify-center mb-10">
        <select
          value={selectedCuisine}
          onChange={(e) => setSelectedCuisine(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          {cuisineTypes.map((type, idx) => (
            <option key={idx} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Recipe Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {visibleRecipes.map((recipe) => (
          <Recipe
            key={recipe._id}
            recipe={recipe}
            handleLikeUpdate={handleLikeUpdate}
          />
        ))}
      </div>

      {/* Toggle Button */}
      {filteredRecipes.length > 8 && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            className="py-2"
            onClick={() => {
              setShowAll((prev) => !prev);
              showAll && window.scrollTo(0, 0);
            }}
          >
            {showAll ? "Show Less Recipes" : "See All Recipes"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AllRecipes;
