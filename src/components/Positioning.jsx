import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import { FaArrowCircleLeft } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css";
import "../components/styles/Positioning.css";

const Positioning = () => {
  const [destination, setDestination] = useState("");
  const [detailsInserted, setDetailsInserted] = useState(false);
  const [scannedDevices, setScannedDevices] = useState([]);
  const [position, setPosition] = useState({ x: null, y: null });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [imageCoordinates, setImageCoordinates] = useState(null);

  // Function to update current time
  const updateCurrentTime = () => {
    setCurrentTime(new Date());
  };

  useEffect(() => {
    // Update current time every second
    const interval = setInterval(updateCurrentTime, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async () => {
    setDetailsInserted(true);
    try {
      const options = {
        acceptAllDevices: true, // Accept all BLE devices
      };

      const devices = await navigator.bluetooth.requestDevice(options);

      // Retrieve RSSI measurements for each device
      const scannedDevicesData = await Promise.all(
        devices.map(async (device) => {
          const rssi = await device.gatt.connect()
            .then(() => device.gatt.getPrimaryService("battery_service"))
            .then(service => service.getCharacteristic("battery_level"))
            .then(characteristic => characteristic.readValue());

          return {
            id: device.id,
            name: device.name,
            rssi: rssi,
          };
        })
      );

      setScannedDevices(scannedDevicesData);
      toast.success("Scanning complete!"); // Display toast message

      // Calculate image coordinates after scanning devices
      if (scannedDevicesData.length >= 3) {
        const estimatedPosition = trilateration(scannedDevicesData);
        setPosition(estimatedPosition);
        calculateImageCoordinates(estimatedPosition);
      }
    } catch (error) {
      console.error("Error scanning BLE devices:", error);
      toast.error("Error scanning BLE devices"); // Display error toast message
    }
  };

  // Trilateration function
  const trilateration = (devices) => {
    // Replace this with your trilateration logic
    // For demonstration purposes, let's assume the positions of BLE devices
    const bleDevicePositions = [
      { x: 0, y: 0 },
      { x: 5, y: 0 },
      { x: 0, y: 5 },
    ];

    // Get RSSI measurements from scanned devices
    const rssis = devices.map((device) => device.rssi);

    const numDevices = bleDevicePositions.length;
    let xSum = 0;
    let ySum = 0;
    let weightSum = 0;

    for (let i = 0; i < numDevices; i++) {
      const { x, y } = bleDevicePositions[i];
      const rssi = rssis[i];

      // Weighted average calculation
      const weight = Math.pow(10, (-69 - rssi) / (10 * 2)); 
      xSum += x * weight;
      ySum += y * weight;
      weightSum += weight;
    }

    const xAvg = xSum / weightSum;
    const yAvg = ySum / weightSum;

    return { x: xAvg, y: yAvg };
  };

  // Calculate image coordinates based on estimated position
  const calculateImageCoordinates = (estimatedPosition) => {
    // Replace this with your image coordinate calculation logic
    // For demonstration purposes, let's assume the image is positioned relative to the estimated position
    const imageX = estimatedPosition.x + 2; // Offset by 2 units
    const imageY = estimatedPosition.y + 2; // Offset by 2 units
    setImageCoordinates({ x: imageX, y: imageY });
  };

  // Real-time update of destination state as user types
  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  // Handle "Enter" key press to trigger search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <Nav />
      <ToastContainer />
      <div className="bluetooth-finder">
        <Link to="/" className="back-link">
          <FaArrowCircleLeft className="back-icon" />
        </Link>
        <div className="time">{currentTime.toLocaleTimeString()}</div>
        <div className="title">Search position here!</div>
        <p>Press Search button or Enter key to find paired devices</p>
        <div className="destination">
          <p>Destination</p>
          <input
            type="text"
            value={destination}
            onChange={handleDestinationChange}
            onKeyPress={handleKeyPress} // Listen for "Enter" key press
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
      {position.x !== null && position.y !== null && (
        <div>
          <h2>Estimated Position:</h2>
          <p>X: {position.x}, Y: {position.y}</p>
        </div>
      )}
      {imageCoordinates && (
        <div>
          <h2>Image Coordinates:</h2>
          <p>X: {imageCoordinates.x}, Y: {imageCoordinates.y}</p>
        </div>
      )}
    </>
  );
};

export default Positioning;
