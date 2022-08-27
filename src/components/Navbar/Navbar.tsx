import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import { changeMode } from "../../features/darkMode/darkModeSlice";
import { auth } from "../../firebase";

const Navbar = () => {
  const [mode, setMode] = useState<boolean | undefined>();
  const dispatch = useAppDispatch();
  const { email, username } = useAppSelector((state) => state.auth);
  const { dark } = useAppSelector((state) => state.lightDark);

  const navigate = useNavigate();

  useEffect(() => {
    setMode(dark);
  }, [dark]);

  function handleLogout() {
    localStorage.removeItem("auth");
    auth.signOut();
    dispatch(logout());
    navigate("/");
  }

  function changeDarkLight() {
    setMode((prev) => !prev);
    dispatch(changeMode());
    localStorage.setItem("darkMode", JSON.stringify(!mode));
  }

  return (
    <div className="relative">
      <ul className="flex child:ml-4 justify-center pt-8">
        <li>
          <Link to="/">Home</Link>
        </li>

        {/*if user is NOT logged */}
        {email === null ? (
          <>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/register">register</Link>
            </li>
          </>
        ) : null}

        {/*if user IS logged */}
        {email === null ? null : (
          <>
            <li>
              <Link to="create">Create Post</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}

        <li>
          <button onClick={changeDarkLight}>Change Mode</button>
        </li>
      </ul>

      <p className="absolute right-16 top-[2rem]">
        {email && `Logged as: ${username}`}
      </p>
    </div>
  );
};

export default Navbar;
