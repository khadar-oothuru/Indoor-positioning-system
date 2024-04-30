// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import ScanBLE from "./components/ScanBLE";
import Map from "./components/Map";
import Positioning from "./components/Positioning";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage/>} />
        <Route exact path="/scan-ble" element={<ScanBLE/>} />
        <Route exact path="/map" element={<Map/>} />
        <Route exact path="/position" element={<Positioning/>} />
        </Routes>
    </Router>
  );
};

export default AppRouter;
