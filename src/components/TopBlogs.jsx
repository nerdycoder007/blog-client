import Image from "next/image";
import React from "react";
import BlogCard from "./BlogCard";

function TopBlogs() {
  return (
    <div>
      <h1 className="section-heading my-8">Today's selection</h1>

      <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  );
}

export default TopBlogs;
