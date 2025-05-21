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

  if (myRecipes.length === 0) {
    return (
      <div className="flex gap-4 items-center justify-center flex-col">
        <Link to="/add-recipe">
          <Button variant="outline">Add Recipe</Button>
        </Link>
        <p className="md:text-lg font-semibold">You Didn't Add Recipe</p>

        <iframe src="https://lottie.host/embed/3ab83073-20e0-49a2-a5f2-bb2eaebe4ffb/wqhfyqiu3R.lottie"></iframe>
      </div>
    );
  }

  // delete recipe functionality
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
            }
          });

        Swal.fire({
          title: "Deleted!",
          text: "Recipe has been deleted.",
          icon: "success",
        });
      }
    });
  };


  // update recipe
  const handleUpdateRecipe=()=>{
    console.log('aa')
  }

  return (
    <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
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
  );
};

export default MyRecipes;
