import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/404";

import "./styles/app.scss";

const App = () => {
 
  const handleCopy = (e) => {
    const selectedText = window.getSelection().toString();
    const pageLink = window.location.href;
    const copiedTextWithLink = selectedText + ' (Source: ' + pageLink + ')';
    e.clipboardData.setData('text/plain', copiedTextWithLink);
    e.preventDefault();
  };

  useEffect(() => {
    document.addEventListener('copy', handleCopy);

    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, []); // Empty dependency array to ensure it runs only on component mount

  return (
    <div className="App">
      <Navbar />
      <div className="fixed-navbar"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
