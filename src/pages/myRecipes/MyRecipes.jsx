import React, { use, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { FirebaseAuthContext } from "../../provider/FirebaseAuthContext";
import MyRecipesCard from "../../components/recipes/MyRecipesCard";
import Button from "../../components/ui/Button";
import Swal from "sweetalert2";

const MyRecipes = () => {
  const { user } = use(FirebaseAuthContext);
  const initialRecipes = useLoaderData();
  const [myRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    const recipesData = initialRecipes.filter(
      (recipe) => recipe.userEmail === user?.email
    );
    setMyRecipes(recipesData);
  }, [initialRecipes, user]);

  // Handle like update
  const handleLikeUpdate = (id) => {
    setMyRecipes((prev) => {
      const updated = prev.map((r) =>
        r._id === id ? { ...r, likes: r.likes + 1 } : r
      );
      return [...updated].sort((a, b) => b.likes - a.likes);
    });
  };

  // Handle recipe update
  const handleUpdateRecipe = (updatedRecipe) => {
    setMyRecipes((prevRecipes) =>
      prevRecipes.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r))
    );
    // For now, force a reload to update everywhere
    window.location.reload();
  };

  // Handle delete
  const handleDeleteRecipe = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/recipes/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              const remainingRecipes = myRecipes.filter(
                (recipe) => recipe._id !== id
              );
              setMyRecipes(remainingRecipes);

              Swal.fire("Deleted!", "Recipe has been deleted.", "success");
            }
          });
      }
    });
  };

  if (myRecipes.length === 0) {
    return (
      <div className="flex justify-center items-center flex-col gap-4">
        <h2 className="text-2xl font-semibold">You Didn't Add Recipe</h2>
        <Link to="/add-recipe">
          <Button variant="outline">Browse Recipes</Button>
        </Link>
        <iframe src="https://lottie.host/embed/3ab83073-20e0-49a2-a5f2-bb2eaebe4ffb/wqhfyqiu3R.lottie"></iframe>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        My Recipes
      </h2>
      <div className="grid md:grid-cols-2 gap-5">
        {myRecipes.map((recipe) => (
          <MyRecipesCard
            key={recipe._id}
            recipe={recipe}
            handleLikeUpdate={handleLikeUpdate}
            handleDeleteRecipe={handleDeleteRecipe}
            handleUpdateRecipe={handleUpdateRecipe}
          />
        ))}
      </div>
    </div>
  );
};

export default MyRecipes;
