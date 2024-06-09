import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./conponent/header";
import Footer from "./conponent/footer/footer";
import { Outlet } from "react-router-dom";
import Login from "./pages/login/login";
import Home from "./conponent/home/home";
import Register from "./pages/register/register";
import { CallFetchAccount } from "./services/axios";
import { useDispatch, useSelector } from "react-redux";
import { getLoginAction } from "./redux/account/accountSlide";
import Loading from "./loading/loading";
import Error404 from "./conponent/error/error-404";
import Admin from "./conponent/admin/admin";
import Protectedrouter from "./pages/protected-router/protected-router";
import ErrorAdmin from "./conponent/error/error-403";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
const LayoutAdmin = () => {
  const isAdmin = window.location.pathname.startsWith("/admin");
  const user = useSelector((state) => state.account.user);
  const userRole = user.role;
  return (
    <>
      {isAdmin && userRole === "ADMIN" && <Header />}
      <Outlet />
      {isAdmin && userRole === "ADMIN" && <Footer />}
    </>
  );
};

export default function App() {
  const dispatch = useDispatch();
  const isAuthentication = useSelector(
    (state) => state.account.isAuthentication
  );
  const FetchAccount = async () => {
    const res = await CallFetchAccount();
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    ) {
      return;
    }
    if (res && res?.data) {
      dispatch(getLoginAction(res.data));
    }
  };
  useEffect(() => {
    FetchAccount();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error404 />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "book",
          element: <div>book pages</div>,
        },
      ],
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <ErrorAdmin />,
      children: [
        {
          index: true,
          element: (
            <Protectedrouter>
              <Admin />
            </Protectedrouter>
          ),
        },
        {
          path: "user",
          element: <div>book pages</div>,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return (
    <>
      {isAuthentication === true ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading />
      )}
    </>
  );
}
