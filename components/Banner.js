// components/Banner.js
import React from "react";

const Banner = ({ title, backgroundImage }) => {
  const style = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})`, backgroundPosition: "50% 30%" }
    : {};

  return (
    <div className="w-full h-64 relative bg-cover bg-center" style={style}>
      <h1 className="relative text-4xl md:text-5xl font-bold text-blue-500 text-center pt-20">
        {title}
      </h1>
    </div>
  );
};

// Ajout de defaultProps pour rendre backgroundImage optionnel
Banner.defaultProps = {
  backgroundImage: "", // ou null, selon vos préférences
};

export default Banner;
