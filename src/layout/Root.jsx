import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const Root = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="min-h-[calc(100vh-360px)]  max-w-7xl mx-auto pt-24 md:pt-28 pb-12 px-4 md:px-6 lg:px-8">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Root;
