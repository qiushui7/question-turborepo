import React from "react";
import "./App.css";
import router from "./router";
import {RouterProvider} from "react-router-dom";
import "antd/dist/reset.css";

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
