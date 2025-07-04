import React, { useState, useMemo, useEffect } from "react";
import Recipe from "../../components/recipes/Recipe";
import Button from "../../components/ui/Button";

const AllRecipes = () => {
  // const recipes = useLoaderData();
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch(`https://traditional-recipe-server.vercel.app/recipes?searchParams=${search}`)
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, [search]);

  // Extract unique cuisine types
  const cuisineTypes = useMemo(() => {
    const types = recipes.map((r) => r.cuisine);
    return ["All", ...Array.from(new Set(types))];
  }, [recipes]);

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

  // Sort by preparationTime
  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    const aTime = Number(a.preparationTime) || 0;
    const bTime = Number(b.preparationTime) || 0;
    return sortOrder === "asc" ? aTime - bTime : bTime - aTime;
  });

  const visibleRecipes = showAll
    ? sortedRecipes
    : sortedRecipes.slice(0, 10);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <title>All Recipes | Traditional Recipe</title>
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-3xl md:text-4xl font-semibold mb-2">
          Our All Recipes
        </h2>
        <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
        <p className="mt-4 max-w-2xl mx-auto">
          Discover our all recipes, filtered by cuisine type and ranked by
          likes.
        </p>
      </div>
      <form className="pb-4 flex flex-col md:flex-row justify-center items-center gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required
          placeholder="Search by Recipe Name"
          className="md:w-xs mt-1 border-1 border-gray-300 px-4 py-1.5 rounded-full focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 transition duration-200 bg-base-100 text-base-content"
        />
        <Button>Search</Button>
      </form>
      {/* <p className="text-center mb-2">Sort All Recipe By: 👇🏻</p> */}
      {/* Dropdown Filter */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">

        <select
          value={selectedCuisine}
          onChange={(e) => setSelectedCuisine(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          {cuisineTypes.map((type, idx) => (
            <option key={idx} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="asc">Preparation Time: Low to High</option>
          <option value="desc">Preparation Time: High to Low</option>
        </select>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
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
