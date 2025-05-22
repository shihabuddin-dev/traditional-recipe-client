import React, { use, useState, useEffect } from "react";
import { Link } from "react-router";
import Button from "../ui/Button";
import {
  HiMiniHandThumbUp,
  HiOutlineHandThumbUp,
  HiOutlineBookmark,
  HiBookmark,
} from "react-icons/hi2";
import { FirebaseAuthContext } from "../../provider/FirebaseAuthContext";
import Swal from "sweetalert2";
import { Fade } from "react-awesome-reveal";

const Recipe = ({
  recipe,
  handleLikeUpdate,
  hideWishlistButton,
  disableLikeButton,
}) => {
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
    userEmail,
  } = recipe;

  const { user } = use(FirebaseAuthContext);

  const [likes, setLikes] = useState(initialLikes);
  const [isLiking, setIsLiking] = useState(false);
  const [isWishListed, setIsWishListed] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;

    // Check if the logged-in user's email matches the recipe's userEmail
    if (user && user.email === userEmail) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You can't like your own recipe!",
      });
      return;
    }

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

  const toggleWishlist = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please log in to use the wishlist feature!",
      });
      return;
    }
    setIsWishListed((prev) => {
      const newState = !prev;
      if (newState) {
        // Add to wishlist
        const stored = localStorage.getItem("wishlist");
        let wishlist = stored ? JSON.parse(stored) : [];
        if (!wishlist.some((r) => r._id === recipe._id)) {
          wishlist.push(recipe);
          localStorage.setItem("wishlist", JSON.stringify(wishlist));
          Swal.fire({
            icon: "success",
            title: "Added to Wishlist!",
            showConfirmButton: false,
            timer: 1200,
          });
        }
      } else {
        // Remove from wishlist
        const stored = localStorage.getItem("wishlist");
        let wishlist = stored ? JSON.parse(stored) : [];
        wishlist = wishlist.filter((r) => r._id !== recipe._id);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
      }
      return newState;
    });
  };

  // Keep wishlist icon state on reload
  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem("wishlist");
      let wishlist = stored ? JSON.parse(stored) : [];
      setIsWishListed(wishlist.some((r) => r._id === recipe._id));
    }
  }, [user, recipe._id]);

  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Fade delay={200}>
      <div className="flex flex-col h-full bg-base-150 rounded-2xl overflow-hidden shadow-lg border border-orange-100 border-dashed hover:shadow-xl transition-all duration-300 relative">
        {/* Image Container */}
        <div className="h-48 md:h-52 lg:h-44 overflow-hidden relative">
          {/* Popular Recipe Badge */}
          {likes > 10 && (
            <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              Popular Recipe
            </div>
          )}

          {/* Wishlist Button */}
          {!hideWishlistButton && (
            <button
              onClick={toggleWishlist}
              className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:scale-110 transition-all duration-200"
              title={isWishListed ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isWishListed ? (
                <HiBookmark className="text-orange-500 text-lg" />
              ) : (
                <HiOutlineBookmark className="text-gray-700 text-lg" />
              )}
            </button>
          )}

          {/* Recipe Image */}
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-102 transition-transform duration-800"
          />
        </div>

        {/* Content */}
        <div className="p-4 md:p-5 flex flex-col flex-grow gap-2">
          {/* Title & Cuisine */}
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm italic">{cuisine} Cuisine</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
              ⏱ {preparationTime} min
            </span>
            {categories.map((cat, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Ingredients */}
          <p className="text-sm line-clamp-2">
            <strong>Ingredients:</strong>{" "}
            {ingredients.length > 50
              ? ingredients.slice(0, 50) + "..."
              : ingredients}
          </p>

          {/* Footer: Like + View */}
          <div className="mt-auto flex items-center justify-between py-2 border-t border-b border-dashed border-orange-200">
            <button
              onClick={handleLike}
              className={`flex items-center text-orange-500 gap-1 hover:text-orange-600 transition text-sm font-medium ${
                disableLikeButton
                  ? "cursor-not-allowed pointer-events-none opacity-60"
                  : ""
              }`}
              disabled={isLiking || disableLikeButton}
              title={
                disableLikeButton
                  ? "Like disabled on wishlist"
                  : "Like this recipe"
              }
            >
              {likes > 0 ? (
                <HiMiniHandThumbUp className="text-xl cursor-pointer" />
              ) : (
                <HiOutlineHandThumbUp className="text-xl cursor-pointer" />
              )}
              <span className="text-base-content">{likes}</span>
              <span className="text-sm">interested</span>
            </button>

            <Link to={`/recipes/${_id}`}>
              <Button variant="secondary" className="text-xs md:text-sm">
                View Details
              </Button>
            </Link>
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-3">
            <img
              src={userPhoto}
              alt={userName}
              title={userName}
              className="w-10 h-10 rounded-full border border-orange-200 object-cover"
            />
            <div className="text-sm leading-tight">
              <p className="font-semibold">By: {userName}</p>
              <p className="text-xs">Published: {formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default Recipe;
