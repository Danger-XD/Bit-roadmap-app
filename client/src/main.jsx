import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.jsx";
import RoadMap from "./pages/RoadMap.jsx";
import NotFound from "./pages/NotFound.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import PageLayout from "./layouts/PageLayout.jsx";
import RoadmapPage from "./pages/RoadmapPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      { index: true, element: <App /> },
      { path: "roadmap", element: <RoadMap /> },
      { path: "contact", element: <ContactUs /> },
      { path: "roadmap/one/:postId", element: <RoadmapPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/auth/",
    element: <PageLayout />,
    children: [
      { path: "signup", element: <SignupPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
