import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router";
import Button from "../ui/Button";

const Recipe = ({ recipe, onLikeUpdate }) => {
  const {
    _id,
    image,
    title,
    ingredients,
    cuisine,
    preparationTime,
    categories,
    likes: initialLikes,
  } = recipe;

  const [likes, setLikes] = useState(initialLikes);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;

    setIsLiking(true);
    try {
      const res = await fetch(`http://localhost:3000/recipes/${_id}/like`, {
        method: "PATCH",
      });

      if (res.ok) {
        setLikes((prev) => prev + 1);
        if (onLikeUpdate) {
          onLikeUpdate(_id);
        }
      }
    } catch (error) {
      console.error("Error liking recipe:", error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300">
      {/* Image */}
      <img src={image} alt={title} className="w-full h-48 object-cover" />

      {/* Content */}
      <div className="p-4">
        {/* Title and Cuisine */}
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">{cuisine} Cuisine</p>

        {/* Prep Time + Categories */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
            ⏱ {preparationTime} min
          </span>
          {categories.map((cat, idx) => (
            <span
              key={idx}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Ingredients preview */}
        <p className="text-gray-600 text-sm mb-3">
          <strong>Ingredients:</strong>{" "}
          {ingredients.length > 50
            ? ingredients.slice(0, 50) + "..."
            : ingredients}
        </p>

        {/* Likes + Button */}
        <div className="flex items-center justify-between ">
          {/* ❤️ Like Icon (clickable) */}
          <button
            onClick={handleLike}
            className="flex items-center text-orange-500 gap-1 hover:text-orange-600 transition text-2xl cursor-pointer"
            disabled={isLiking}
            title="Like this recipe"
          >
            <FaHeart />
            <span className="text-base">{likes}</span>
          </button>

          {/* View Details */}
          <Link to={`/recipes/${_id}`}>
            <Button>View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
