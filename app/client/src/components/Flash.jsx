// Flash.js
import React, { useState, useEffect } from 'react';

function Flash({ message }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000); // Hide the notification after 3 seconds (adjust as needed)

    return () => clearTimeout(timer);
  }, []);

  return show ? <div className="flash-notification">{message}</div> : null;
}

export default Flash;
