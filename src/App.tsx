import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Layout from "./container/layout/layout";
import router from "./router/router";

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
