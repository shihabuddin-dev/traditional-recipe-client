import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/home/Home";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import NotFound from "../pages/notFound/NotFound";
import AddRecipe from "../pages/addRecipe/AddRecipe";
import Spinner from "../components/ui/Spinner";
import AllRecipes from "../pages/allRecipes/AllRecipes";
import RecipeDetails from "../pages/recipeDetails/RecipeDetails";
import ResetPassword from "../pages/auth/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        hydrateFallbackElement: <Spinner />,
        loader: () => fetch("http://localhost:3000/recipes/top"),
        Component: Home,
      },
      { path: "/signin", Component: SignIn },
      { path: "/signup", Component: SignUp },
      { path: "/reset-password", Component: ResetPassword },
      { path: "/add-recipe", Component: AddRecipe },
      {
        path: "/all-recipes",
        hydrateFallbackElement: <Spinner />,
        loader: () => fetch("http://localhost:3000/recipes"),
        Component: AllRecipes,
      },
      {
        path: "/recipes/:id",
        hydrateFallbackElement: <Spinner />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/recipes/${params.id}`),
        Component: RecipeDetails,
      },

      // private routes
      // {
      //     path: '/profile',
      //     element:
      //         <PrivateRoutes>
      //             <Profile />
      //         </PrivateRoutes>
      // },
    ],
  },
]);

export default router;
