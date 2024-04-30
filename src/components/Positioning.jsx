import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import { FaArrowCircleLeft } from "react-icons/fa";
import "../components/styles/Positioning.css";

const Positioning = () => {
  const [destination, setDestination] = useState("");
  const [detailsInserted, setDetailsInserted] = useState(false);

  const handleSearch = () => {
    setDetailsInserted(true);
  };

  // Real-time update of destination state as user types
  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  // Real-time functionality to perform actions based on destination state
  useEffect(() => {
    // Example: Perform an action whenever destination state changes
    console.log("Destination:", destination);
  }, [destination]); // Run this effect whenever destination state changes

  return (
<>

    <Nav />
    <div className="bluetooth-finder">
      
      <Link to="/" className="back-link">
        <FaArrowCircleLeft className="back-icon" />
      </Link>
      <div className="time">01:20</div>
      <div className="title">Search position here !</div>
      <p>Press Search button to find paired devices</p>
      <div className="destination">
        <p>Destination</p>
        <input
          type="text"
          value={destination}
          onChange={handleDestinationChange}
          className="destination-input"
        />
      </div>
      {detailsInserted && (
        <p className="success">Details Inserted Successfully</p>
      )}
      <button onClick={handleSearch} className="search-button">
        SEARCH
      </button>
    </div>
    </>
  );
};

export default Positioning;
