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
import Wishlist from "../components/recipes/Wishlist";
import MyProfile from "../pages/myProfile/MyProfile";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";

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
          fetch("http://localhost:3000/recipes/top"),
        Component: Home,
      },
      { path: "/about-us", Component: About },
      { path: "/contact-us", Component: Contact },
      { path: "/signin", Component: SignIn },
      { path: "/signup", Component: SignUp },
      { path: "/reset-password", Component: ResetPassword },
      {
        path: "/all-recipes",
        hydrateFallbackElement: <Spinner />,
        loader: () =>
          fetch("http://localhost:3000/recipes"),
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
          fetch("http://localhost:3000/recipes"),
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
            `http://localhost:3000/recipes/${params.id}`
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
      {
        path: "/my-profile",
        element: (
          <PrivateRoutes>
            <MyProfile />
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
