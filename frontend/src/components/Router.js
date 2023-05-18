import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../routes/Home";
import Auth from "../routes/Auth";

import { useState } from "react";

const AppRouter = ({ isLoggedIn }) => {
  const router = createBrowserRouter([
    {
      path: `${process.env.PUBLIC_URL}/`,
      element: <div>{isLoggedIn ? <Home /> : <Auth />}</div>,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};
export default AppRouter;
