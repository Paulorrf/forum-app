import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser === null) navigate("/");
  }, []);

  return <div>{children}</div>;
};

export default RequireAuth;
