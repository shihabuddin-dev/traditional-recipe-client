import React from "react";
import { Link } from "react-router";
import Button from "../../components/ui/Button";
import Lottie from "lottie-react";
import notFound from '../../assets/notFount.json'

const NotFound = () => {
  return (
    <div className=" w-full flex flex-col items-center justify-center bg-white px-4 py-8 transition-colors duration-300">
      <title>Not Found || Traditional Recipe</title>
      <div className="w-full max-w-md flex flex-col items-center gap-4 relative">
        <Lottie
          animationData={notFound}
          className="w-full h-56 sm:h-72 md:h-86 rounded-2xl"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-orange-600 text-center">Oops! Page Not Found</h1>
        <p className="text-base md:text-lg text-base-content/70 text-center">The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="w-full flex justify-center">
          <Button className="w-full max-w-xs">Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
