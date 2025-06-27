import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaRegEye, FaHeart, FaRegHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { Fade } from "react-awesome-reveal";

const MyRecipesCard = ({
  recipe,
  handleDeleteRecipe,
  // handleUpdateRecipe,
}) => {
  const {
    _id,
    image,
    title,
    // ingredients,
    // instructions,
    cuisine,
    preparationTime,
    // categories,
  } = recipe || {};
  // const recipe= useLoaderData()

  const [isWishListed, setIsWishListed] = useState(false);

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
    <Fade triggerOnce>
      <div className="flex flex-col xs:flex-col md:flex-row bg-base-100 shadow-md rounded-2xl overflow-hidden border border-orange-300 w-full max-w-2xl mx-auto">
        <div className="w-full xs:w-full md:w-1/3 min-w-[100px] min-h-[100px]  md:max-w-sm flex-shrink-0 flex-grow-0 h-44 xs:h-48 md:h-auto overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500 rounded-t-2xl md:rounded-l-2xl md:rounded-t-none"
            style={{ minHeight: "10rem", maxHeight: "16rem" }}
          />
        </div>

        <div className="p-3 xs:p-4 sm:p-5 flex flex-col justify-between flex-grow w-full">
          <div>
            <h2 className="text-2xl font-bold mb-1 break-words line-clamp-1">{title}</h2>
            <p className="italic mb-1">{cuisine} Cuisine</p>
            <p className="text-sm text-orange-600 rounded-full mb-1">
              ⏱ {preparationTime} min
            </p>
          </div>

          {/* <div className="mb-2 space-y-1">
            <p className="text-xs xs:text-sm line-clamp-2">
              <strong>Ingredients:</strong> {ingredients.slice(0, 40)}{ingredients.length > 40 ? '...' : ''}
            </p>
            <p className="text-xs xs:text-sm line-clamp-2">
              <strong>Instructions:</strong> {instructions.slice(0, 60)}{instructions.length > 60 ? '...' : ''}
            </p>
          </div> */}


          {/* <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs bg-orange-100 text-orange-600 px-2 xs:px-3 py-1 rounded-full">
              ⏱ {preparationTime} min
            </span>
            {categories.map((cat, idx) => (
              <span
                key={idx}
                className="text-xs bg-gray-100 text-orange-600 px-2 xs:px-3 py-1 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div> */}

          <div className="flex flex-col xs:flex-row xs:items-center pt-3 border-t border-orange-200 gap-2 xs:gap-0">
            <div className="flex flex-wrap gap-2 xs:gap-3 items-center ">
              <button
                onClick={toggleWishlist}
                className={`flex items-center justify-center w-6 h-6 xs:w-8 xs:h-8 rounded text-lg font-medium transition shadow-sm ${isWishListed
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
                to={`/dashboard/recipes/${_id}`}
                className="flex items-center justify-center w-6 h-6 xs:w-8 xs:h-8 bg-amber-100 text-amber-700 hover:bg-amber-200 rounded-full text-lg font-medium transition shadow-sm"
                title="View Details"
              >
                <FaRegEye />
              </Link>
              <Link
                to={`/dashboard/edit/recipes/${_id}`}
                className="flex items-center justify-center w-6 h-6 xs:w-8 xs:h-8 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-md text-lg font-medium transition shadow-sm"
                title="Update Recipe"
              >
                <FaEdit />
              </Link>
              <button
                onClick={() => handleDeleteRecipe(_id)}
                className="flex items-center justify-center w-6 h-6 xs:w-8 xs:h-8 bg-red-100 text-red-600 hover:bg-red-200 rounded-md text-lg font-medium transition shadow-sm"
                title="Delete Recipe"
              >
                <FaTrash className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default MyRecipesCard;
