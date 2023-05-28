import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../routes/Home";
import Auth from "../routes/Auth";

import { useState, useEffect } from "react";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchLoginStatus = async () => {
      const savedLogin = await localStorage.getItem("isLoggedIn");
      if (savedLogin === "true") {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
      console.log(isLoading)
    };

    fetchLoginStatus();
  }, []);
  const router = createBrowserRouter([
    {
      path: `${process.env.PUBLIC_URL}/`,
      element: (
        <div>
          {isLoading ? (
            <div>
              <h1>loading</h1>
            </div>
          ) : isLoggedIn ? (
            <Home />
          ) : (
            <Auth setIsLoggedIn={setIsLoggedIn} />
          )}
        </div>
      ),
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};
export default AppRouter;
