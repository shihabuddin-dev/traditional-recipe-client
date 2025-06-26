import React from "react";
import { Link } from "react-router";
import Button from "../../components/ui/Button";
import Lottie from "lottie-react";
import notFound from '../../assets/notFount.json'

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white transition-colors duration-300">
      <title>Not Found || Traditional Recipe</title>
      <Link to="/" className="mt-4 absolute top-4">
        <Button> Go Back Home</Button>
      </Link>
      <div className="mt-24 flex gap-2 justify-center animate-pulse">
        <span className="inline-block text-2xl md:text-4xl">🍕</span>
        <span className="inline-block text-2xl md:text-4xl">🍔</span>
        <span className="inline-block text-2xl md:text-4xl">🍜</span>
        <span className="inline-block text-2xl md:text-4xl">🍩</span>
        <span className="inline-block text-2xl md:text-4xl">🍰</span>
      </div>
      <Lottie
        animationData={notFound}
        className="w-full h-[200px] md:h-[300px] rounded-2xl"
      ></Lottie>
    </div>
  );
};

export default NotFound;
