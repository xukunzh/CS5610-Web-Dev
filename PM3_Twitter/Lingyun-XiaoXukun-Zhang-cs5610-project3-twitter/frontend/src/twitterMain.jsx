import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./LoginPage";
import TalkTownPage from "./TalkTownPage";
import RegisterPage from "./RegisterPage";
import { UserProvider } from "./context/userContext";
import UserProfile from "./UserProfilePage";
import { CreateOrUpdatePostPage } from "./CreateOrUpdatePostPage";
import SettingsPage from "./SettingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/talktown" />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/talktown",
    element: <TalkTownPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/user/:username",
    element: <UserProfile />,
  },
  {
    path: "/createpost",
    element: <CreateOrUpdatePostPage isCreatePost={true} />,
  },
  {
    path: "/updatepost/:postId",
    element: <CreateOrUpdatePostPage isCreatePost={false} />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
