import React, { use, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { FirebaseAuthContext } from "../../provider/FirebaseAuthContext";
import MyRecipesCard from "../../components/recipes/MyRecipesCard";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Button from "../../components/ui/Button";

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
  if (myRecipes.length === 0) {
    return (
      <div className="flex gap-4 items-center justify-center flex-col">
        <Link to="/add-recipe">
          <Button variant="outline">Add Recipe</Button>
        </Link>
        <p className="md:text-xl font-semibold">You Didn't Add Recipe</p>
        <DotLottieReact
          src="https://lottie.host/3ab83073-20e0-49a2-a5f2-bb2eaebe4ffb/wqhfyqiu3R.lottie"
          loop
          autoplay
          className="max-w-lg mx-auto"
        />
      </div>
    );
  }
  return (
    <div>
      {myRecipes.map((recipe) => (
        <MyRecipesCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
};

export default MyRecipes;
