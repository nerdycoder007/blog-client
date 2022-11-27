import Image from "next/image";
import Link from "next/link";
import React from "react";

function BlogCard() {
  const postId = "post-id";
  return (
    <div className="flex max-w-md flex-1 flex-col gap-4">
      <Link href={`/post/${postId}`}>
        <div className="relative h-72 w-full cursor-pointer rounded-md transition-all duration-300 hover:scale-[1.01] hover:shadow-md">
          <Image
            priority
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </div>
      </Link>
      <p className="text-sm uppercase tracking-widest text-sky-600 dark:text-sky-300">
        Nature
      </p>
      {/* <Link href="/" > */}
      <h4 className="heading w-full cursor-pointer truncate">
        <span className="styledLink">
          The Rise of Artificial Intelligence and the Future of Humans
        </span>
      </h4>
      {/* </Link> */}
      <Link href="/author" passHref>
        <div className="flex cursor-pointer items-center gap-4">
          <div className="relative h-6 w-6 rounded-full">
            <Image
              className="rounded-full"
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <p className="text">Joshua Wood</p>
          <div className="h-1 w-1 rounded-full bg-gray-500 dark:text-gray-300"></div>
          <p className="text">October 22, 2022</p>
        </div>
      </Link>
    </div>
  );
}

export default BlogCard;
