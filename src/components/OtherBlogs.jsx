import React from "react";
import BlogCard from "./BlogCard";
function OtherBlogs() {
  return (
    <div className="mt-32">
      <h1 className="section-heading my-8">Other Blogs</h1>
      <div className="my-12 grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 ">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  );
}

export default OtherBlogs;
