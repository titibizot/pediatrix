// components/Background.js
import React from "react";

const Background = ({ backgroundImage, children }) => {
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {children}
    </div>
  );
};

export default Background;
