import React from "react";
import ReactDOM from "react-dom/client";
import MapApplication from "./Components/application/MapApplication";
import "ol/ol.css";
import "./main.css";

const root = ReactDOM.createRoot(document.getElementById("root")!).render(
  <MapApplication />,
);
