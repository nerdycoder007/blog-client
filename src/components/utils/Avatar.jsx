import Image from "next/image";
import Link from "next/link";
import React from "react";

function Avatar({ className, src, ...rest }) {
  return (
    <Link href="/profile/1">
      <div className={`relative h-6 w-6 rounded-full ${className} `}>
        <Image
          className="rounded-full"
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </Link>
  );
}

export default Avatar;
