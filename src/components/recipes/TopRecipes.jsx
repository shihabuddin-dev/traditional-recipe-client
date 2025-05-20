import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import Button from "../ui/Button";
import { Link } from "react-router";
import Spinner from "../ui/Spinner";

const TopRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopRecipes = async () => {
      try {
        const res = await fetch("http://localhost:3000/recipes/top");
        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching top recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRecipes();
  }, []);

  //  Handle like update from child component
  const handleLikeUpdate = (id) => {
    setRecipes((prevRecipes) => {
      const updated = prevRecipes.map((r) =>
        r._id === id ? { ...r, likes: r.likes + 1 } : r
      );
      // Re-sort top recipes by likes
      return [...updated].sort((a, b) => b.likes - a.likes).slice(0, 6);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
          Our Top Recipes
        </h2>
        <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Discover the most loved recipes, ranked by our food-loving community.
        </p>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recipes.map((recipe) => (
            <Recipe
              key={recipe._id}
              recipe={recipe}
              handleLikeUpdate={handleLikeUpdate}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8">
        <Link to="/all-recipes">
          <Button variant="outline" className="py-2">
            See All Recipes
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TopRecipes;
