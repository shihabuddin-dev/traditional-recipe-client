import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import Button from "../ui/Button";
import { Link } from "react-router";
import Spinner from "../ui/Spinner";
import { Fade } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";

const TopRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopRecipes = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/recipes/top"
        );
        const data = await res.json();
        // Sort recipes by likes (descending) and keep top 6
        const sorted = [...data].sort((a, b) => b.likes - a.likes).slice(0, 8);
        setRecipes(sorted);
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
      return [...updated].sort((a, b) => b.likes - a.likes).slice(0, 8);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-10">
        <Fade direction="left">
          <h2 className="text-3xl md:text-4xl font-semibold mb-2">
            <span>
              <Typewriter
                words={["Our Top Recipes", "Most Liked", "Trending Now"]}
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
            Discover the most loved recipes, ranked by our food-loving
            community.
          </p>
        </Fade>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
