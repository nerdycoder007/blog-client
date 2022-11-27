import { createContext, useEffect, useState } from "react";
import React from "react";
import supabase from "../supabase/client";
import { useDispatch } from "react-redux";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

import { login } from "../redux/slices/authSlice";
const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState();
  const [blogs, setBlogs] = useState([]);
  const [authData, setAuthData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTheme(
      localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
    );
  }, [theme]);
  useEffect(() => {
    document.documentElement.className = "";
    document.documentElement.classList.add(theme);
  }, [theme]);
  useEffect(() => {
    async function getUserSession() {
      const session = await supabase.auth.getSession();
      console.log(session);
      setAuthData(session?.data?.session?.user);
    }
    getUserSession();
  }, []);
  function getAccessToken() {
    fetch("http://localhost:8000/refresh_token", {
      method: "POST",
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        const { accessToken, userId, username } = data;
        console.log(accessToken, userId, username, "FROM CONTEXT");
        if (data?.accessToken) {
          dispatch(login({ accessToken, id: userId, username }));
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }

  useEffect(() => {
    console.log("From auth context");
    if (loading) {
      getAccessToken();
      return;
    }

    const time = 4 * 60 * 1000;
    const interval = setInterval(() => {
      getAccessToken();
    }, time);
    return () => clearInterval(interval);
  }, []);
  console.log("Auth Data", authData);
  const contextData = {
    theme,
    setTheme,
    authData,
    setAuthData,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {!loading ? (
        children
      ) : (
        <div
          style={{
            height: "95vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "95vw",
          }}
        >
          <ClimbingBoxLoader color="#fd70a1" loading={true} />
        </div>
      )}
    </AuthContext.Provider>
  );
};
