import React, { useState, useEffect } from "react";
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

const inputBase =
  "w-full border border-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 transition duration-200";

const EditMyRecipe = ({ recipe, onClose, handleUpdateRecipe }) => {
  const [formData, setFormData] = useState({ ...recipe });

  useEffect(() => {
    if (recipe) {
      setFormData(recipe);
    }
  }, [recipe]);

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
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.categories.length === 0) {
      Swal.fire("Error!", "Please select at least one category!", "warning");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/recipes/${formData._id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updated = await res.json();
        Swal.fire("Success!", "Recipe updated successfully!", "success");
        handleUpdateRecipe(updated); // call parent handler
        onClose();
      } else {
        throw new Error("Failed to update");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Something went wrong!", "error");
    }
  };

  if (!recipe) return null;

  return (
    <div className="p-2">
      <h2 className="text-xl font-semibold mb-4 text-center text-orange-600">
        ✏️ Edit Recipe
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="md:col-span-2">
          <label className="block mb-1 text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={inputBase}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={inputBase}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Cuisine Type</label>
          <select
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            className={inputBase}
            required
          >
            <option value="">Select Cuisine</option>
            {cuisineOptions.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Preparation Time</label>
          <input
            type="number"
            name="preparationTime"
            value={formData.preparationTime}
            onChange={handleChange}
            className={inputBase}
            required
            min="1"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 text-gray-700">Ingredients</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className={inputBase}
            rows="3"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 text-gray-700">Instructions</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            className={inputBase}
            rows="4"
            required
          />
        </div>

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

        {/* Likes (editable) */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">
            Like Count
          </label>
          <input
            type="number"
            name="likes"
            value={formData.likes === 0 ? '' : formData.likes}
            onChange={handleChange}
            className={inputBase}
            min="0"
          />
        </div>

        <div className="md:col-span-2 mt-4">
          <Button type="submit" className="w-full py-2">
            Update Recipe
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditMyRecipe;
