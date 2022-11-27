import React from "react";
import TopBlogs from "./TopBlogs";
import OtherBlogs from "./OtherBlogs";
import Navbar from "./Navbar";
import Hero from "./Hero";

function Main() {
  return (
    <div>
      <div className="flex min-h-screen flex-col">
        <Hero />
      </div>
      <div className="p-2 sm:px-4 md:px-8 lg:px-16 xl:px-32">
        <TopBlogs />
        <OtherBlogs />
      </div>
    </div>
  );
}

export default Main;
