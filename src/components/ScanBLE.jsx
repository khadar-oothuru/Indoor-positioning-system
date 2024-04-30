import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import { FaArrowCircleLeft } from "react-icons/fa";
import "../components/styles/ScanBLE.css";

const ScanBLEPage = () => {
  // State to store scanned BLE devices
  const [scannedDevices, setScannedDevices] = useState([]);

  // Function to simulate scanning BLE devices
  const scanBLEDevices = () => {
    // Simulate scanning BLE devices
    const simulatedScannedDevices = [
      { id: "1", name: "Device 1" },
      { id: "2", name: "Device 2" },
      { id: "3", name: "Device 3" },
    ];

    // Set scanned devices to state
    setScannedDevices(simulatedScannedDevices);
  };

  // Effect to scan BLE devices on component mount
  useEffect(() => {
    scanBLEDevices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
   

    <Nav />
    <div className="scan-ble-page">
     
      <Link to="/" className="back-link-scan">
        <FaArrowCircleLeft className="back-icon-scan" />
      </Link>
      <h2 className="page-title">  Scan BLE Devices here !</h2>
      <button onClick={scanBLEDevices} className="scan-button">
      scan devices
      </button>
      <div className="scanned-devices">
        <h3>Scanned Devices:</h3>
        <ul>
          {scannedDevices.map((device) => (
            <li key={device.id}>{device.name}</li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default ScanBLEPage;
