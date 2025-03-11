// components/Banner.js
import React from "react";

const Banner = ({ title, backgroundImage }) => {
  const style = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})`, backgroundPosition: "50% 30%" }
    : {};
    
  return (
    <div className="w-full h-64 relative bg-cover bg-center" style={style}>
      {/* Superposition noire pour améliorer le contraste */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <h1 className="relative text-4xl md:text-5xl font-bold text-white text-center pt-20 drop-shadow-lg">
        {title}
      </h1>
    </div>
  );
};

Banner.defaultProps = {
  backgroundImage: "",
};

export default Banner;
