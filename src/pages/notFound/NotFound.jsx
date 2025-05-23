import React from "react";
import { Link } from "react-router";
import Button from "../../components/ui/Button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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
      <DotLottieReact
        src="https://lottie.host/2af52792-efb1-4da5-b6e7-c382a06e29ec/JclbtQHOhB.lottie"
        loop
        autoplay
      />
    </div>
  );
};

export default NotFound;
