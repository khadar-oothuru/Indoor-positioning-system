import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
// import beaconImage from "../images/beacon.png"; 
// import legendImage from "../images/legend.png"; 
import "../components/styles/Map.css";

const Map = () => {
  return (
    <>
    
    <Nav />
    <div className="map-container">
    
      <Link  to="/">
        <FaArrowCircleLeft  className="back-icon-scan"/>
      </Link>
      <div className="map-content">
        <h2>This is the map</h2>
        {/* <img src={beaconImage} alt="Beacon" className="beacon-image" /> */}
        <p>
          Here is some content related to the map. You can add more text or
          other elements here.
        </p>
        {/* <img src={legendImage} alt="Legend" className="legend-image" /> */}
        <p>
          This is the legend for the map. It explains the symbols or colors
          used on the map.
        </p>
      </div>
    </div>
    </>
  );
};

export default Map;
