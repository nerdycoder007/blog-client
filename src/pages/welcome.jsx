import React from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { username } = useSelector((state) => state.auth.value);
  return (
    <div className="m-16 flex h-full flex-1 flex-col justify-center">
      <h1>Welcome ,{username}</h1>
    </div>
  );
};

export default Welcome;
