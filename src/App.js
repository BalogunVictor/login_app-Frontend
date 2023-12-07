import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* Import all components */
import PageNotFound from "./component/PageNotFound";
import Password from "./component/Password";
import Profile from "./component/Profile";
import Recovery from "./component/Recovery";
import Register from "./component/Register";
import Reset from "./component/Reset";
import Username from "./component/Username";

/* root routes */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Username></Username>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/password",
    element: <Password></Password>,
  },
  {
    path: "/profile",
    element: <Profile></Profile>,
  },
  {
    path: "/recovery",
    element: <Recovery></Recovery>,
  },
  {
    path: "/reset",
    element: <Reset></Reset>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

const App = () => {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
};

export default App;
