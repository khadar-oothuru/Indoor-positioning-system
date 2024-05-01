import React, { useState, useEffect } from 'react';
import { MdBluetoothConnected, MdBluetoothDisabled } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Bluetooth = () => {
  const [isBluetoothOn, setIsBluetoothOn] = useState(false);
  const [bluetoothDevice, setBluetoothDevice] = useState(null);

  useEffect(() => {
    // Check if Bluetooth is available
    if (!('bluetooth' in navigator)) {
      toast.error('Web Bluetooth API is not supported in this browser');
    } else {
      navigator.bluetooth.getAvailability().then(available => {
        if (!available) {
          toast.error('Web Bluetooth API is globally disabled');
        }
      }).catch(error => {
        console.error('Error checking Bluetooth availability:', error);
        toast.error('Error checking Bluetooth availability');
      });
    }
  }, []);

  const handleTurnOn = async () => {
    setIsBluetoothOn(true); // Update state to indicate Bluetooth is on

    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service'] // Example service
      });
      console.log('Bluetooth device connected:', device);
      setBluetoothDevice(device);
    } catch (error) {
      console.error('Error turning on Bluetooth:', error);
      toast.error('Error turning on Bluetooth');
      setIsBluetoothOn(false); // Revert state if an error occurs
    }
  };

  const handleTurnOff = () => {
    setIsBluetoothOn(false); // Update state to indicate Bluetooth is off

    if (bluetoothDevice) {
      bluetoothDevice.gatt.disconnect();
      console.log('Bluetooth device disconnected');
    }
    
    setBluetoothDevice(null);
  };

  return (
    <div>
      <ToastContainer />
      <div className="blueicon">
        {isBluetoothOn ? (
          <MdBluetoothConnected className="blue" />
        ) : (
          <MdBluetoothDisabled className="blue" />
        )}
      </div>
      <button onClick={handleTurnOn} disabled={isBluetoothOn} className="custom-button">
        Turn On
      </button>
      <button onClick={handleTurnOff} disabled={!isBluetoothOn} className="custom-button">
        Turn Off
      </button>
    </div>
  );
};

export default Bluetooth;
