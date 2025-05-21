import React from "react";

const MyRecipesCard = ({ recipe }) => {
  const { title } = recipe || {};

  return <div>{title}</div>;
};

export default MyRecipesCard;
