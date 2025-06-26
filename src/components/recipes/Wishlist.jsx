import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import Button from "../ui/Button";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    setWishlist(stored ? JSON.parse(stored) : []);
  }, []);

  const handleRemove = (id) => {
    const updated = wishlist.filter((r) => r._id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    Swal.fire({
      icon: "success",
      title: "Removed!",
      text: "Recipe removed from your wishlist.",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  if (wishlist.length === 0) {
    return (
      <div className="flex justify-center items-center flex-col gap-4">
        <title>Wishlist | Traditional Recipe</title>
        <h2 className="text-2xl font-semibold">Your Wishlist is empty</h2>
        <Link to="/all-recipes">
          <Button variant="outline">Browse Recipes</Button>
        </Link>
        <iframe className="h-74" src="https://lottie.host/embed/3ab83073-20e0-49a2-a5f2-bb2eaebe4ffb/wqhfyqiu3R.lottie"></iframe>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center pb-2">My Wishlist</h2>
      <div className="w-20 h-1 bg-orange-500 mx-auto mb-8"></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {wishlist.map((recipe) => (
          <div key={recipe._id} className="relative">
            <Recipe recipe={recipe} hideWishlistButton disableLikeButton />
            <button
              onClick={() => handleRemove(recipe._id)}
              className="absolute top-3 right-3 bg-red-100 text-red-600 rounded-full p-2 shadow hover:bg-red-200 flex items-center justify-center"
              title="Remove from wishlist"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
