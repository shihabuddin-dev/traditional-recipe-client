import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { HiMiniHandThumbUp, HiOutlineHandThumbUp } from "react-icons/hi2";
import EditMyRecipe from "./EditMyRecipe";

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

  const [likes, setLikes] = useState(initialLikes);
  const [isLiking, setIsLiking] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-md rounded-2xl overflow-hidden border border-orange-100">
      <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{title}</h2>
          <p className="text-sm text-gray-500 italic mb-3">{cuisine} Cuisine</p>
        </div>

        <div className="mb-2 text-gray-700">
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
              className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-dashed border-orange-200">
          <div
            onClick={handleLike}
            className="flex items-center gap-1 text-orange-500 text-lg font-medium"
          >
            {likes > 0 ? (
              <HiMiniHandThumbUp className="text-xl" />
            ) : (
              <HiOutlineHandThumbUp className="text-xl" />
            )}
            <span className="text-gray-800">{likes}</span>
          </div>

          <div className="flex gap-3">
            <button
              className="flex items-center gap-1 bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 py-1 rounded-md text-sm font-medium transition"
              onClick={() => setShowModal(true)}
            >
              <FaEdit />
              Update
            </button>

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

            <button
              onClick={() => handleDeleteRecipe(_id)}
              className="flex items-center gap-1 bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded-md text-sm font-medium transition"
            >
              <FaTrash />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRecipesCard;
