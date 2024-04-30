import React, { useState } from 'react';
import { MdBluetoothConnected, MdBluetoothDisabled } from 'react-icons/md';


const Bluetooth = () => {
  const [isBluetoothOn, setIsBluetoothOn] = useState(false);

  const handleTurnOn = () => {
    // Simulate turning on Bluetooth
    setIsBluetoothOn(true);
  };

  const handleTurnOff = () => {
    // Simulate turning off Bluetooth
    setIsBluetoothOn(false);
  };

  return (
    <div>
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
