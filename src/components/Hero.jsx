import Image from "next/image";
import React from "react";
import WritingSVG from "../images/writing.svg";
import Button from "./utils/Button";

function Hero() {
  return (
    <div className="flex flex-1 items-center justify-between overflow-hidden px-8">
      <div className="flex flex-col items-start gap-8">
        <h1 className="section-heading">Write, Create and Share</h1>
        <Button>Create</Button>
      </div>
      <div className="relative">
        <div className="blob-box top-[20%] -left-4   bg-purple-300 "></div>
        <div className="animation-delay-2 blob-box  top-[20%]  -right-4  bg-yellow-300 "></div>
        <div className="animation-delay-4 blob-box  top-[20%] left-[20%]   bg-pink-300"></div>
        <Image
          height="500"
          width="500"
          priority
          className="drop-shadow-xl filter"
          src={WritingSVG}
          alt=""
        />
      </div>
    </div>
  );
}

export default Hero;
