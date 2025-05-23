import React, { useState, useEffect, useContext } from "react";
import { FaTrash, FaEdit, FaRegEye, FaHeart, FaRegHeart } from "react-icons/fa";
import { HiMiniHandThumbUp, HiOutlineHandThumbUp } from "react-icons/hi2";
import EditMyRecipe from "./EditMyRecipe";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { FirebaseAuthContext } from "../../provider/FirebaseAuthContext";
import { Fade } from "react-awesome-reveal";

const MyRecipesCard = ({
  recipe,
  handleLikeUpdate,
  handleDeleteRecipe,
  handleUpdateRecipe,
}) => {
  const {
    _id,
    image,
    title,
    ingredients,
    instructions,
    cuisine,
    preparationTime,
    categories,
    likes: initialLikes,
  } = recipe || {};

  const { user } = useContext(FirebaseAuthContext);
  const isOwner = user && recipe.userEmail === user.email;

  const [likes, setLikes] = useState(initialLikes);
  const [isLiking, setIsLiking] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isWishListed, setIsWishListed] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;

    setIsLiking(true);
    try {
      const res = await fetch(
        `https://traditional-recipe-server.vercel.app/recipes/${_id}/like`,
        {
          method: "PATCH",
        }
      );

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

  // Wishlist logic
  const toggleWishlist = () => {
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
            text: "Recipe has been added to your wishlist.",
            timer: 1500,
            showConfirmButton: false,
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

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    let wishlist = stored ? JSON.parse(stored) : [];
    setIsWishListed(wishlist.some((r) => r._id === recipe._id));
  }, [recipe._id]);

  return (
    <Fade>
      <div className="flex flex-col md:flex-row bg-base-100 shadow-md rounded-2xl overflow-hidden border border-orange-300 border-dashed">
        <div className="md:w-1/3 min-w-[180px] max-w-xs md:max-w-sm flex-shrink-0 flex-grow-0 h-48 md:h-auto overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500 rounded-l-2xl"
            style={{ minHeight: "12rem", maxHeight: "24rem" }}
          />
        </div>

        <div className="p-5 flex flex-col justify-between flex-grow">
          <div>
            <h2 className="text-2xl font-bold mb-1">{title}</h2>
            <p className="text-sm italic mb-3">{cuisine} Cuisine</p>
          </div>

          <div className="mb-2">
            <p>
              <strong>Ingredients:</strong> {ingredients}
            </p>
            <p>
              <strong>Instructions:</strong> {instructions}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
              ⏱ {preparationTime} min
            </span>
            {categories.map((cat, idx) => (
              <span
                key={idx}
                className="text-xs bg-gray-100 text-orange-600 px-3 py-1 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-dashed border-orange-200">
            <div
              onClick={() => {
                if (!isOwner) handleLike();
              }}
              className={`flex items-center gap-1 text-orange-500 text-lg font-medium ${
                isOwner
                  ? "opacity-100 cursor-not-allowed"
                  : "cursor-pointer hover:text-orange-600"
              }`}
              title={
                isOwner ? "You can't like your own recipe" : "Like this recipe"
              }
            >
              {likes > 0 ? (
                <HiMiniHandThumbUp className="text-xl" />
              ) : (
                <HiOutlineHandThumbUp className="text-xl" />
              )}
              <span className="text-base-content font-bold">{likes}</span>
            </div>
            <div className="flex gap-2 sm:gap-3 items-center">
              <button
                onClick={toggleWishlist}
                className={`flex items-center justify-center w-7 h-5 sm:w-8 sm:h-6 rounded-md text-lg font-medium transition shadow-sm ${
                  isWishListed
                    ? "bg-yellow-100 text-yellow-700 shadow"
                    : "bg-white text-yellow-500 hover:bg-yellow-50"
                } duration-200`}
                title={
                  isWishListed ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                {isWishListed ? (
                  <FaHeart className="text-lg text-yellow-500" />
                ) : (
                  <FaRegHeart className="text-lg text-yellow-500" />
                )}
              </button>
              <Link
                to={`/recipes/${_id}`}
                className="flex items-center justify-center w-7 h-5 sm:w-8 sm:h-6 bg-amber-100 text-amber-700 hover:bg-amber-200 rounded-md text-lg font-medium transition shadow-sm"
                title="View Details"
              >
                <FaRegEye />
              </Link>
              <button
                className="flex items-center justify-center w-7 h-5 sm:w-8 sm:h-6 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-md text-lg font-medium transition shadow-sm"
                onClick={() => setShowModal(true)}
                title="Update Recipe"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDeleteRecipe(_id)}
                className="flex items-center justify-center w-7 h-5 sm:w-8 sm:h-6 bg-red-100 text-red-600 hover:bg-red-200 rounded-md text-lg font-medium transition shadow-sm"
                title="Delete Recipe"
              >
                <FaTrash />
              </button>
            </div>
          </div>

          {/* Modal */}
          {showModal && (
            <dialog id="recipe_edit_modal" className="modal modal-open">
              <div className="modal-box w-11/12 max-w-5xl">
                <EditMyRecipe
                  recipe={recipe}
                  onClose={() => setShowModal(false)}
                  handleUpdateRecipe={handleUpdateRecipe}
                />
                <div className="modal-action">
                  <form method="dialog">
                    <button
                      className="btn bg-red-500 text-white"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          )}
        </div>
      </div>
    </Fade>
  );
};

export default MyRecipesCard;
