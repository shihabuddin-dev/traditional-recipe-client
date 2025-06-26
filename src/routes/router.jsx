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
import Wishlist from "../components/recipes/Wishlist";
import MyProfile from "../pages/myProfile/MyProfile";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import DashboardLayout from "../layout/DashboardLayout";
import PrivateRoutes from "./PrivateRoutes";
import DashboardHome from "../components/dashboardHome/DashboardHome";
import EditMyRecipe from "../components/recipes/EditMyRecipe";
import Gallery from "../pages/gallery/Gallery";
import Statistic from "../pages/statistic/Statistic";

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
      { path: "about-us", Component: About },
      { path: "contact-us", Component: Contact },
      { path: "gallery", Component: Gallery },
      { path: "signin", Component: SignIn },
      { path: "signup", Component: SignUp },
      { path: "reset-password", Component: ResetPassword },
      {
        path: "all-recipes",
        hydrateFallbackElement: <Spinner />,
        loader: () =>
          fetch("https://traditional-recipe-server.vercel.app/recipes"),
        Component: AllRecipes,
      },

    ],
  },
  // Dashboard private routes
  {
    path: "/dashboard",
    element: <PrivateRoutes><DashboardLayout /></PrivateRoutes>,
    children: [
      {
        index: true,
        Component: DashboardHome
      },
      {
        path: "add-recipe",
        Component: AddRecipe,
      },
      {
        path: "edit/recipes/:id",
        hydrateFallbackElement: <Spinner />,
        loader: ({ params }) =>
          fetch(
            `https://traditional-recipe-server.vercel.app/recipes/${params.id}`
          ),
        Component: EditMyRecipe,
      },
      {
        path: "my-recipes",
        hydrateFallbackElement: <Spinner />,
        loader: () =>
          fetch("https://traditional-recipe-server.vercel.app/recipes"),
        Component: MyRecipes,
      },
      {
        path: "recipes/:id",
        hydrateFallbackElement: <Spinner />,
        loader: ({ params }) =>
          fetch(
            `https://traditional-recipe-server.vercel.app/recipes/${params.id}`
          ),
        Component: RecipeDetails,
      },
      {
        path: "wishlist",
        Component: Wishlist,
      },
      {
        path: "statistic",
        hydrateFallbackElement: <Spinner />,
        loader: () =>
          fetch(
            'https://traditional-recipe-server.vercel.app/recipes'
          ),
        Component: Statistic,
      },
      {
        path: "my-profile",
        Component: MyProfile,
      },
    ],
  },
]);

export default router;
