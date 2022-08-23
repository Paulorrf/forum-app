import React from "react";
import { Outlet } from "react-router-dom";

const Posts = () => {
  return (
    <div>
      <h2>Posts</h2>
      <Outlet />
    </div>
  );
};

export default Posts;
