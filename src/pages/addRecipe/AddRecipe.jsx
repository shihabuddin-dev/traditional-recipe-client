import React, { useContext, useState } from "react";
import Button from "../../components/ui/Button";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import {
  FaArrowLeft,
  FaListUl,
  FaImage,
  FaUtensils,
  FaBookOpen,
  FaList,
  FaClock,
  FaTag,
} from "react-icons/fa";
import { FirebaseAuthContext } from "../../provider/FirebaseAuthContext";

const cuisineOptions = [
  "Bangladeshi",
  "Italian",
  "Mexican",
  "Indian",
  "Chinese",
  "Others",
];

const categoryOptions = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"];

const inputBase =
  "w-full border-2 border-base-content/20 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 transition duration-200 bg-base-100 text-base-content";

const AddRecipe = () => {
  const { user } = useContext(FirebaseAuthContext);
  // user info from firebase
  const userInfo = {
    userName: user?.displayName,
    userEmail: user?.email,
    userPhoto: user?.photoURL,
  };

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    ingredients: "",
    instructions: "",
    cuisine: "",
    preparationTime: "",
    categories: [],
    likes: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        categories: checked
          ? [...prev.categories, value]
          : prev.categories.filter((cat) => cat !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddRecipe = (e) => {
    e.preventDefault();

    if (formData.categories.length === 0) {
      Swal.fire({
        title: "Failed!",
        text: "Please select at least one category!",
        icon: "warning",
      });
      return;
    }

    const now = new Date();
    const pad = (n) => n.toString().padStart(2, "0");
    const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
      now.getDate()
    )}`;
    const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(
      now.getSeconds()
    )}`;
    const recipeData = {
      ...formData,
      ...userInfo, // Attach user info here
      createdAt: `${dateStr} ${timeStr}`,
    };

    fetch("https://traditional-recipe-server.vercel.app/recipes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(recipeData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("After add New Recipe", data);
        Swal.fire({
          title: "Success!",
          text: "New Recipe has been added",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/my-recipes");
      })
      .catch((err) => {
        console.error("Error saving recipe:", err);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong!",
          icon: "error",
        });
      });
  };

  return (
    <div>
      <div className="max-w-5xl mx-auto px-2 flex justify-between">
        <title>Add Recipe || Traditional Recipe</title>
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <FaArrowLeft /> Back
        </Button>
        <Link to="/all-recipes">
          <Button variant="outline" className="flex items-center gap-2">
            <FaListUl /> All Recipes
          </Button>
        </Link>
      </div>

      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-10 bg-base-100 shadow-lg rounded-xl mt-8 mb-16 border-2 border-orange-400">
        <h2 className="text-3xl font-bold text-center mb-6">
          🍽️ Add a New Recipe
        </h2>
        <p className="text-center mb-10 max-w-2xl mx-auto">
          Share your delicious creations with the world! Fill out the form below
          to add a new recipe to our collection.
        </p>

        <form
          onSubmit={handleAddRecipe}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Image */}
          <div className="col-span-1 md:col-span-2">
            <label className="font-medium mb-1 flex items-center gap-2">
              <FaImage className="text-orange-400" /> Image URL
            </label>
            <input
              type="text"
              name="image"
              placeholder="https://example.com/your-dish.jpg"
              value={formData.image}
              onChange={handleChange}
              className={inputBase}
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="font-medium mb-1 flex items-center gap-2">
              <FaUtensils className="text-orange-400" /> Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Spicy Chicken Curry"
              value={formData.title}
              onChange={handleChange}
              className={inputBase}
              required
            />
          </div>

          {/* Cuisine */}
          <div>
            <label className="font-medium mb-1 flex items-center gap-2">
              <FaTag className="text-orange-400" /> Cuisine Type
            </label>
            <select
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              className={inputBase}
              required
            >
              <option value="">Select cuisine</option>
              {cuisineOptions.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>

          {/* Preparation Time */}
          <div>
            <label className="font-medium mb-1 flex items-center gap-2">
              <FaClock className="text-orange-400" /> Preparation Time (minutes)
            </label>
            <input
              type="number"
              name="preparationTime"
              value={formData.preparationTime}
              onChange={handleChange}
              className={inputBase}
              placeholder="Enter Preparation Time in Minutes"
              required
              min="1"
            />
          </div>

          {/* Ingredients */}
          <div className="md:col-span-2">
            <label className="font-medium mb-1 flex items-center gap-2">
              <FaList className="text-orange-400" /> Ingredients
            </label>
            <textarea
              name="ingredients"
              rows="3"
              placeholder="Enter each ingredient separated by commas..."
              value={formData.ingredients}
              onChange={handleChange}
              className={inputBase}
              required
            ></textarea>
          </div>

          {/* Instructions */}
          <div className="md:col-span-2">
            <label className="font-medium mb-1 flex items-center gap-2">
              <FaBookOpen className="text-orange-400" /> Instructions
            </label>
            <textarea
              name="instructions"
              rows="4"
              placeholder="Describe how to make the dish..."
              value={formData.instructions}
              onChange={handleChange}
              className={inputBase}
              required
            ></textarea>
          </div>

          {/* Categories */}
          <div className="md:col-span-2">
            <label className="font-medium mb-2 flex items-center gap-2">
              <FaTag className="text-orange-400" /> Categories
            </label>
            <div className="flex flex-wrap gap-4">
              {categoryOptions.map((cat) => (
                <label key={cat} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={cat}
                    checked={formData.categories.includes(cat)}
                    onChange={handleChange}
                    className="checkbox checkbox-xs checkbox-warning"
                  />
                  <span className="text-orange-500">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Likes (hidden, default 0) */}
          <div className="md:col-span-2 hidden">
            <label className="block font-medium mb-1">
              Like Count (default: 0)
            </label>
            <input
              type="number"
              name="likes"
              value={formData.likes}
              readOnly
              className={inputBase + " bg-gray-100 cursor-not-allowed"}
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-4">
            <Button type="submit" className="w-full py-3">
              Add Recipe
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
