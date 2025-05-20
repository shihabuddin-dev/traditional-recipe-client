import React from "react";
import { Link } from "react-router";
import Button from "../../components/ui/Button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const NotFound = () => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <Link to="/" className="mt-4 absolute -bottom-10 md:top-10">
        <Button> Go Back Home</Button>
      </Link>
      <DotLottieReact
        src="https://lottie.host/052deeb2-9ad9-43ec-9992-b873255fe34b/sqDmejCbIc.lottie"
        loop
        autoplay
      />
    </div>
  );
};

export default NotFound;
