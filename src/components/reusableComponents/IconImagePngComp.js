import React from "react";

export const IconImagePngComp = (props) => {
  const { altText, imageURL, iconSize, hueDegrees, brightness } = props;

  const sizes = {
    small: {
      width: "20px",
      height: "20px",
    },
    medium: {
      width: "40px",
      height: "40px",
    },
    large: {
      width: "60px",
      height: "60px",
    },
    default: {
      width: "40px",
      height: "40px",
    },
  };

  //set default cases
  let iconSizeProp = sizes[iconSize] || "default";
  let hueDegreesProp = hueDegrees ? hueDegrees : 0;
  let brightnessProp = brightness ? brightness : 100;

  const imgStyle = {
    ...sizes[iconSizeProp],
    filter: `hue-rotate(${hueDegreesProp}deg) brightness(${brightnessProp}%)`,
  };
  return (
    <div>
      <img alt={altText} src={imageURL} style={imgStyle} />
    </div>
  );
};
