import React, { useState } from "react";
import Button from "../../components/ui/Button";
import Swal from "sweetalert2";

const cuisineOptions = [
  "Bangladeshi",
  "Italian",
  "Mexican",
  "Indian",
  "Chinese",
  "Others",
];

const categoryOptions = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"];

// Reusable input class
const inputBase =
  "w-full border border-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 transition duration-200";

const AddRecipe = () => {
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
    fetch("http://localhost:3000/recipes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("After add New Recipe", data);
        Swal.fire({
          title: "Success!",
          text: "New Recipe has been added",
          icon: "success",
        });
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-10 bg-white shadow-lg rounded-xl mt-8 mb-16">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        🍽️ Add a New Recipe
      </h2>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Share your delicious creations with the world! Fill out the form below
        to add a new recipe to our collection.
      </p>

      <form
        onSubmit={handleAddRecipe}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Image */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">
            Image URL
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
          <label className="block text-gray-700 font-medium mb-1">Title</label>
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

        {/* Cuisine Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Cuisine Type
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
          <label className="block text-gray-700 font-medium mb-1">
            Preparation Time (minutes)
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
          <label className="block text-gray-700 font-medium mb-1">
            Ingredients
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
          <label className="block text-gray-700 font-medium mb-1">
            Instructions
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
          <label className="block text-gray-700 font-medium mb-2">
            Categories
          </label>
          <div className="flex flex-wrap gap-4">
            {categoryOptions.map((cat) => (
              <label key={cat} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={cat}
                  checked={formData.categories.includes(cat)}
                  onChange={handleChange}
                  className="accent-orange-500"
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Likes (hidden, default 0) */}
        <div className="md:col-span-2 hidden">
          <label className="block text-gray-700 font-medium mb-1">
            Like Count (default: 0)
          </label>
          <input
            type="number"
            name="likes"
            value={formData.likes}
            readOnly
            className={
              inputBase + " bg-gray-100 text-gray-600 cursor-not-allowed"
            }
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
  );
};

export default AddRecipe;
