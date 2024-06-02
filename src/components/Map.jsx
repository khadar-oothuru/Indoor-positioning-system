import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import map from "../images/map.png"

import "../components/styles/Map.css";

const Map = () => {
  return (
    <>
      <Nav />
      <div className="map-container">
        <Link to="/">
          <FaArrowCircleLeft className="back-icon-scan" />
        </Link>
        <div className="map-content">
          <h2>This is the map</h2>
        
          {/* <p>
            Here is some content related to the map. You can add more text or
            other elements here.
          </p> */}
          <img src={map} alt="Beacon" className="beacon-image" />
        </div>
      </div>
    </>
  );
};

export default Map;
