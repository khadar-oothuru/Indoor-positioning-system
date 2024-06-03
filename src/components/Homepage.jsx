// Homepage.js
import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import "../components/styles/Homepage.css";
import Bluetooth from "./Bluetooth";

const Homepage = () => {
  return (
    <div>
      <Nav />
      <p className="blue-heading">Bluetooth Navigation</p>
      <Bluetooth />
      <Link to="/scanble">
        <button className="custom-button">Scan BLE</button>
      </Link>
      <Link to="/map">
        {" "}
        <button className="custom-button">Map</button>
      </Link>
      <Link to="/position">
        {" "}
        <button className="custom-button"> Positioning </button>
      </Link>
    </div>
  );
};

export default Homepage;
