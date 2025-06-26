import React, { useContext, useState, useMemo } from "react";
import { useLoaderData } from "react-router";
import { FirebaseAuthContext } from "../../provider/FirebaseAuthContext";
import { useNavigate } from "react-router";
import { HiMiniHandThumbUp, HiOutlineHandThumbUp } from "react-icons/hi2";
import Swal from "sweetalert2";
import Button from "../../components/ui/Button";
import { FaArrowLeft, FaListUl } from "react-icons/fa";
import { Link } from "react-router";
import CommentRecipe from "../../components/recipes/CommentRecipe";

const RecipeDetails = () => {
  const recipe = useLoaderData();
  const { user } = useContext(FirebaseAuthContext);
  const navigate = useNavigate();
  const [likes, setLikes] = useState(recipe?.likes || 0);
  const [isLiking, setIsLiking] = useState(false);
  const isOwner = user && recipe.userEmail === user.email;

  // Comment state and logic
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem(`comments_${recipe._id}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Random recipe descriptions and bullet points
  const descriptions = [
    "This recipe brings together a delightful mix of flavors and textures, perfect for any occasion. Whether you're cooking for family or friends, you'll find the process enjoyable and the results delicious. The combination of fresh ingredients and aromatic spices creates a memorable dish that everyone will love. Don't hesitate to add your own twist and make it uniquely yours!",
    "Experience the joy of cooking with this recipe, designed to be both simple and satisfying. Each step is crafted to help you achieve the best results, even if you're new to the kitchen. The balance of nutrition and taste makes it a great choice for any meal. Share it with loved ones and create lasting memories around the table.",
    "Discover a new favorite with this recipe, which blends tradition and creativity. The instructions are easy to follow, and the ingredients are readily available. Enjoy experimenting with different flavors and textures, and don't forget to savor every bite. This dish is sure to become a staple in your home!",
    "Elevate your dining experience with this recipe, featuring a harmonious blend of spices and fresh produce. It's perfect for both everyday meals and special occasions. The versatility of the ingredients allows you to customize the dish to your liking. Enjoy the compliments from your guests as they savor each mouthful!",
  ];
  const bulletPoints = [
    [
      "Easy-to-follow instructions for cooks of all levels.",
      "Perfect for family dinners or gatherings.",
      "Customizable with your favorite ingredients.",
      "A balance of nutrition and flavor.",
      "Encourages creativity in the kitchen.",
    ],
    [
      "Brings together classic and modern flavors.",
      "Great for meal prep and leftovers.",
      "Pairs well with a variety of side dishes.",
      "Loved by both kids and adults.",
      "A fun way to try new ingredients.",
    ],
    [
      "Tested and approved by home cooks.",
      "Step-by-step guidance for best results.",
      "Ideal for sharing with friends.",
      "Can be made ahead for convenience.",
      "A dish that inspires conversation.",
    ],
    [
      "Aromatic spices for a rich taste.",
      "Fresh produce for vibrant color.",
      "Flexible for dietary preferences.",
      "Quick to prepare and serve.",
      "A recipe you'll return to again and again.",
    ],
  ];

  // Pick a random description and bullet set per mount
  const { description, bullets } = useMemo(() => {
    const idx = Math.floor(Math.random() * descriptions.length);
    return { description: descriptions[idx], bullets: bulletPoints[idx] };
  }, [descriptions, bulletPoints]);

  // Redirect to login if not logged in
  if (!user) {
    navigate("/signin", { replace: true });
    return null;
  }

  if (!recipe) return <p className="text-center text-2xl">Recipe not found!</p>;

  const {
    image,
    title,
    cuisine,
    categories,
    preparationTime,
    ingredients,
    instructions,
  } = recipe;

  const handleLike = async () => {
    if (isLiking || isOwner) return;
    setIsLiking(true);
    try {
      const res = await fetch(
        `https://traditional-recipe-server.vercel.app/recipes/${recipe._id}/like`,
        {
          method: "PATCH",
        }
      );
      if (res.ok) {
        setLikes((prev) => prev + 1);
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to like the recipe.",
        timer: 1500,
        showConfirmButton: false,
      });
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <title>Details Recipe| Traditional Recipe</title>
      {/* Top Action Buttons */}
      <div className="max-w-5xl mx-auto px-2 flex flex-col sm:flex-row items-center justify-between flex-wrap gap-4 mb-8">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <FaArrowLeft /> Back
        </Button>

        <span className="inline-block text-sm md:text-base md:font-semibold text-orange-600 bg-orange-100 md:px-4 py-1 py-1.5 rounded-full shadow-sm w-full sm:w-auto text-center">
          {likes} people interested in this recipe
        </span>

        <Link to="/all-recipes" className="w-full sm:w-auto">
          <Button
            variant="outline"
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <FaListUl /> All Recipes
          </Button>
        </Link>
      </div>

      {/* Banner Image */}
      <div className="mb-8">
        <img
          src={image}
          alt={title}
          className="w-full h-[300px] md:h-[400px] object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Title & Cuisine + User Info */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
          <p className="text-lg">{cuisine} Cuisine</p>
        </div>
        {/* User Info */}
        {recipe.userName && (
          <div className="flex items-center gap-3 bg-base-100 px-4 py-2 rounded-lg shadow-sm border border-orange-400  ">
            <img
              src={recipe.userPhoto || "/default-user.png"}
              alt={recipe.userName}
              className="w-12 h-12 rounded-full object-cover border border-gray-400 p-1"
            />
            <div>
              <div className="font-semibold">{recipe.userName}</div>
              {recipe.createdAt && (
                <div className="text-xs">
                  Published: {new Date(recipe.createdAt).toLocaleString()}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Metadata: Time, Categories, Likes */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
          ⏱ {preparationTime} min
        </span>
        {categories.map((cat, idx) => (
          <span
            key={idx}
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
          >
            {cat}
          </span>
        ))}
        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm flex items-center md:gap-1">
          <button
            onClick={handleLike}
            disabled={isLiking || isOwner}
            className={`flex items-center gap-1 focus:outline-none transition ${isOwner ? "opacity-50 cursor-not-allowed" : "hover:text-red-700"
              }`}
            title={
              isOwner ? "You can't like your own recipe" : "Like this recipe"
            }
            type="button"
          >
            {likes > 0 ? (
              <HiMiniHandThumbUp className="text-lg" />
            ) : (
              <HiOutlineHandThumbUp className="text-lg" />
            )}
            <span>{likes}</span>
          </button>
        </span>
      </div>

      {/* Ingredients and Instructions */}
      <div className="mb-8 bg-base-100 border border-orange-400   rounded-xl space-y-2 shadow p-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
          <p className="leading-relaxed">{ingredients}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <p className="leading-relaxed">{instructions}</p>
        </div>
      </div>

      {/* Random Recipe Description */}
      <div className="mb-8 bg-base-100 border border-orange-400   rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-3">About This Recipe</h2>
        <p className="mb-4">{description}</p>
        <ul className="list-disc pl-6 space-y-2">
          {bullets.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>

      {/* Comments Section */}
      <CommentRecipe
        comments={comments}
        currentUser={user}
        onAdd={(updated) => {
          setComments(updated);
          localStorage.setItem(
            `comments_${recipe._id}`,
            JSON.stringify(updated)
          );
        }}
        onDelete={(updated) => {
          setComments(updated);
          localStorage.setItem(
            `comments_${recipe._id}`,
            JSON.stringify(updated)
          );
        }}
      />
    </div>
  );
};

export default RecipeDetails;
