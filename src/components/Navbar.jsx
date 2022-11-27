import { Bars3Icon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../context/AuthContext";
import { logout } from "../redux/slices/authSlice";
import Avatar from "./utils/Avatar";
import Button from "./utils/Button";
import LinkText from "./utils/LinkText";
import Search from "./utils/Search";
function Navbar() {
  const dispatch = useDispatch();
  const { theme, setTheme, authData } = useContext(AuthContext);
  const { username } = useSelector((state) => state.auth.value);

  function handleThemeChange() {
    if (theme === "dark") {
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  }
  function handleSignOut() {
    fetch("http://localhost:8000/sign_out", {
      method: "POST",
      credentials: "include",
    })
      .then(dispatch(logout()))
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
  }
  return (
    <div className="flex items-center  p-8 ">
      <Link href="/" passHref>
        <h1 className="mx-4 mr-auto cursor-pointer font-content text-3xl dark:text-slate-200 ">
          Bikrant
        </h1>
      </Link>
      <div className=" hidden flex-1 items-center gap-8 sm:flex">
        <Search />
        <LinkText className="link">Categories</LinkText>
        <label className="swap swap-rotate ">
          <input type="checkbox" className="sr-only" />
          {/* ${theme === "light" ? "swap-on" : "swap-off"} */}
          <SunIcon
            className={`icon  ${theme === "light" ? "block" : "hidden"} `}
            onClick={handleThemeChange}
          />
          {/* Default Visible = swap-off */}
          <MoonIcon
            className={`icon  ${theme === "light" ? "hidden" : "block"} `}
            onClick={handleThemeChange}
          />
        </label>

        {!username && (
          <Link href="/login" passHref>
            <Button className={"px-1 py-1"}>Login</Button>
          </Link>
        )}
        {username && (
          <>
            <LinkText className={"link"} onClick={handleSignOut}>
              Sign out
            </LinkText>
            <Link href="/profile">
              <Avatar className={"h-12 w-12"} />
            </Link>
            <Link href="/write" passHref>
              <Button className={"px-1 py-1"}>Create</Button>
            </Link>
          </>
        )}
      </div>
      <Bars3Icon className="icon  cursor-pointer sm:hidden" />
    </div>
  );
}

export default Navbar;
