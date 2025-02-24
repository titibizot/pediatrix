// components/Background.js
import React from "react";

const Background = ({ backgroundImage, children, style }) => {
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})`, ...style }}
    >
      {children}
    </div>
  );
};

export default Background;
