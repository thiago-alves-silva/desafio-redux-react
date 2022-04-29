import React from "react";

const Image = ({ src, alt, ...props }) => {
  const handleLoad = ({ target }) => {
    target.style.opacity = "1";
  };

  return (
    <img
      src={src}
      alt={alt}
      {...props}
      style={{ opacity: 0, transition: ".3s", borderRadius: ".3rem" }}
      onLoad={handleLoad}
    />
  );
};

export default Image;
