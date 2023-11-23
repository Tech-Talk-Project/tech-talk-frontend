import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MessagePage from "./pages/MessagePage";
import ProfilePage from "./pages/ProfilePage";
import MainLayout from "./layouts/MainLayout";
import NoHeaderLayout from "./layouts/NoHeaderLayout";
import LoginCallbackPage from "./pages/LoginCallbackPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "/message",
            element: <MessagePage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
        ],
      },
      {
        element: <NoHeaderLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/oauth2/callback/:provider",
            element: <LoginCallbackPage />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
