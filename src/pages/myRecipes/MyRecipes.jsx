import React, { use, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { FirebaseAuthContext } from "../../provider/FirebaseAuthContext";
import MyRecipesCard from "../../components/recipes/MyRecipesCard";
import Button from "../../components/ui/Button";
import Swal from "sweetalert2";
import { FaEdit, FaRegEye, FaTable, FaThLarge, FaTrash } from "react-icons/fa";

const MyRecipes = () => {
  const { user } = use(FirebaseAuthContext);
  const initialRecipes = useLoaderData();
  const [myRecipes, setMyRecipes] = useState([]);
  const [view, setView] = useState("card"); // "card" or "table"

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
        fetch(`https://traditional-recipe-server.vercel.app/recipes/${id}`, {
          method: "DELETE",
        })
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
        <title>My Recipe | Traditional Recipe</title>
        <h2 className="text-2xl font-semibold">You Didn't Add Recipe</h2>
        <Link to="/dashboard/add-recipe">
          <Button variant="outline">Browse Recipes</Button>
        </Link>
        <iframe className="h-78" src="https://lottie.host/embed/f2221793-d449-4921-9930-c9b305cd418e/VRj2wMN4VP.lottie"></iframe>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <title>My Recipes | Traditional Recipe</title>
      <h2 className="text-3xl font-bold text-center pb-2">My Recipes</h2>
      <div className="w-20 h-1 bg-orange-500 mx-auto mb-8"></div>
      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">

        <div className="w-20 mx-auto flex gap-2">
          <button
            className={`p-2 rounded-full border transition ${view === "card"
              ? "bg-orange-500 text-white"
              : "bg-base-100 text-orange-500 border-orange-200"
              }`}
            onClick={() => setView("card")}
            title="Card View"
          >
            <FaThLarge className="text-xl" />
          </button>
          <button
            className={`p-2 rounded-full border transition ${view === "table"
              ? "bg-orange-500 text-white"
              : "bg-base-100 text-orange-500 border-orange-200"
              }`}
            onClick={() => setView("table")}
            title="Table View"
          >
            <FaTable className="text-xl" />
          </button>
        </div>
      </div>

      {view === "card" ? (
        <div className="grid sm:grid-cols-2 gap-5">
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
      ) : (
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="min-w-full bg-base-100">
            <thead>
              <tr className="bg-orange-50 text-orange-600">
                <th className="py-2 px-3 text-left">No.</th>
                <th className="py-2 px-3 text-left">Title</th>
                <th className="py-2 px-3 text-left">Cuisine</th>
                <th className="py-2 px-3 text-left">Prep Time</th>
                <th className="py-2 px-3 text-left">Likes</th>
                <th className="py-2 px-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myRecipes.map((recipe, idx) => (
                <tr
                  key={recipe._id}
                  className=" hover:bg-orange-50 hover:text-black transition"
                >
                  <td className="py-2 px-3">{idx + 1}</td>
                  <td className="py-2 px-3">{recipe.title}</td>
                  <td className="py-2 px-3">{recipe.cuisine}</td>
                  <td className="py-2 px-3">{recipe.preparationTime} min</td>
                  <td className="py-2 px-3">{recipe.likes}</td>
                  <td className="py-2 px-3 flex gap-2">
                    <div className="flex flex-col xs:flex-row xs:items-center pt-3 gap-2 xs:gap-0">
                      <div className="flex gap-2 items-center ">

                        <Link
                          to={`/dashboard/recipes/${recipe._id}`}
                          className="flex items-center justify-center w-6 h-6 xs:w-8 xs:h-8 text-amber-700 hover:bg-amber-200 rounded-full text-lg font-medium transition shadow-sm"
                          title="View Details"
                        >
                          <FaRegEye />
                        </Link>
                        <Link
                          to={`/dashboard/edit/recipes/${recipe._id}`}
                          className="flex items-center justify-center w-6 h-6 xs:w-8 xs:h-8 text-blue-600 hover:bg-blue-200 rounded-md text-lg font-medium transition shadow-sm"
                          title="Update Recipe"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDeleteRecipe(recipe._id)}
                          className="flex items-center justify-center w-6 h-6 xs:w-8 xs:h-8 text-red-600  rounded-md text-lg font-medium transition shadow-sm"
                          title="Delete Recipe"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
