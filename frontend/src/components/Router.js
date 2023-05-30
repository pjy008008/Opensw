import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../routes/Home";
import Auth from "../routes/Auth";

import { useState, useEffect } from "react";

const AppRouter = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchLoginStatus = async () => {
      const savedLogin = await localStorage.getItem("token");
      setIsLoading(false);
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
          ) : localStorage.getItem("token") ? (
            <Home />
          ) : (
            <Auth />
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
