import React from "react";
import { Link } from "react-router";
import Button from "../../components/ui/Button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-not-found flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">404</h1>
      <p className="text-xl text-white mb-6">
        Oops! The recipe you're looking for is not on the menu.
      </p>
      <Link to="/">
        <Button> Go Back Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
