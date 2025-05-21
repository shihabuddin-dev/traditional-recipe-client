import React, { useState } from "react";
import { Link } from "react-router";
import Button from "../ui/Button";
import { HiMiniHandThumbUp, HiOutlineHandThumbUp } from "react-icons/hi2";

const Recipe = ({ recipe, handleLikeUpdate }) => {
  const {
    _id,
    image,
    title,
    ingredients,
    cuisine,
    preparationTime,
    categories,
    likes: initialLikes,
    userName,
    userPhoto,
    createdAt,
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
        if (handleLikeUpdate) {
          handleLikeUpdate(_id);
        }
      }
    } catch (error) {
      console.error("Error liking recipe:", error);
    } finally {
      setIsLiking(false);
    }
  };

  // Format the createdAt date
  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-orange-100">
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title & Cuisine */}
        <h3 className="text-2xl font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-3 italic">{cuisine} Cuisine</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
            ⏱ {preparationTime} min
          </span>
          {categories.map((cat, idx) => (
            <span
              key={idx}
              className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Ingredients */}
        <p className="text-gray-700 text-sm mb-2 line-clamp-2">
          <strong className="text-gray-800">Ingredients:</strong>{" "}
          {ingredients.length > 50
            ? ingredients.slice(0, 50) + "..."
            : ingredients}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-dashed border-orange-200">
          <button
            onClick={handleLike}
            className="flex items-center text-orange-500 gap-1 hover:text-orange-600 transition text-lg font-medium"
            disabled={isLiking}
            title="Like this recipe"
          >
            {likes > 0 ? (
              <HiMiniHandThumbUp className="text-xl" />
            ) : (
              <HiOutlineHandThumbUp className="text-xl" />
            )}
            <span className="text-black">{likes}</span>
            <span className="text-sm">people interested</span>
          </button>

          <Link to={`/recipes/${_id}`}>
            <Button variant="secondary">View Details</Button>
          </Link>
        </div>
        {/* User Info */}
        <div className="flex items-center gap-3 pt-2">
          <img
            src={userPhoto}
            alt={userName}
            className="w-9 h-9 rounded-full border border-orange-200 object-cover"
          />
          <div className="text-sm">
            <p className="font-semibold text-gray-800">Author: {userName}</p>
            <p className="text-gray-500 text-xs">Published: {formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
