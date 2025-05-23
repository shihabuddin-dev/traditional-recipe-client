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
import MyRecipes from "../pages/myRecipes/MyRecipes";
import PrivateRoutes from "./PrivateRoutes";
import EditMyRecipe from "../components/recipes/EditMyRecipe";
import Wishlist from "../components/recipes/Wishlist";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        hydrateFallbackElement: <Spinner />,
        loader: () =>
          fetch("https://traditional-recipe-server.vercel.app/recipes/top"),
        Component: Home,
      },
      { path: "/signin", Component: SignIn },
      { path: "/signup", Component: SignUp },
      { path: "/reset-password", Component: ResetPassword },
      {
        path: "/all-recipes",
        hydrateFallbackElement: <Spinner />,
        loader: () =>
          fetch("https://traditional-recipe-server.vercel.app/recipes"),
        Component: AllRecipes,
      },

      // private routes
      {
        path: "/add-recipe",
        element: (
          <PrivateRoutes>
            <AddRecipe />
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-recipes",
        hydrateFallbackElement: <Spinner />,
        loader: () =>
          fetch("https://traditional-recipe-server.vercel.app/recipes"),
        element: (
          <PrivateRoutes>
            <MyRecipes />
          </PrivateRoutes>
        ),
      },
      {
        path: "/recipes/:id",
        hydrateFallbackElement: <Spinner />,
        loader: ({ params }) =>
          fetch(
            `https://traditional-recipe-server.vercel.app/recipes/${params.id}`
          ),
        element: (
          <PrivateRoutes>
            <RecipeDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoutes>
            <Wishlist />
          </PrivateRoutes>
        ),
      },
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
