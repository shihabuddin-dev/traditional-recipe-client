import React from "react";
import { Link } from "react-router";
import Button from "../../components/ui/Button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const NotFound = () => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <title>Error || Traditional Recipe</title>
      <Link to="/" className="mt-4 absolute -bottom-10 md:top-5">
        <Button> Go Back Home</Button>
      </Link>
      <DotLottieReact
        src="https://lottie.host/2af52792-efb1-4da5-b6e7-c382a06e29ec/JclbtQHOhB.lottie"
        loop
        autoplay
      />
    </div>
  );
};

export default NotFound;
