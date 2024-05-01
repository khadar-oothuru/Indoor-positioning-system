import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import { FaArrowCircleLeft } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import "../components/styles/ScanBLE.css";

const ScanBLEPage = () => {
  // State to store scanned BLE devices
  const [scannedDevices, setScannedDevices] = useState([]);

  // Function to scan BLE devices
  const scanBLEDevices = async () => {
    try {
      const options = {
        acceptAllDevices: true, // Accept all BLE devices
      };

      const devices = await navigator.bluetooth.requestDevice(options);

      // Extract device information
      const scannedDevicesData = devices.map((device) => ({
        id: device.id,
        name: device.name,
      }));

      setScannedDevices(scannedDevicesData);
      toast.success("Scanning complete!"); // Display toast message
    } catch (error) {
      console.error("Error scanning BLE devices:", error);
      toast.error("Error scanning BLE devices"); // Display error toast message
    }
  };

  return (
    <>
      <Nav />
      <ToastContainer /> {/* Place ToastContainer at top level of your component */}
      <div className="scan-ble-page">
        <Link to="/" className="back-link-scan">
          <FaArrowCircleLeft className="back-icon-scan" />
        </Link>
        <h2 className="page-title">Scan BLE Devices here!</h2>
        <button onClick={scanBLEDevices} className="scan-button">
          Scan devices
        </button>
        <div className="scanned-devices">
          <h3>Scanned Devices:</h3>
          <ul>
            {scannedDevices.map((device, index) => (
              <li key={index}>{device.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ScanBLEPage;
