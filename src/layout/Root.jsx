import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/navbar/Navbar";

const Root = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

export default Root;
