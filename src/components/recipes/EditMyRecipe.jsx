import React from "react";
import { useLoaderData } from "react-router";

const EditMyRecipe = ({ handleUpdateRecipe }) => {
    const recipe=useLoaderData()
    console.log(recipe)
  return (
    <div>
      <button onClick={handleUpdateRecipe} className="btn">aa</button>
    </div>
  );
};

export default EditMyRecipe;
