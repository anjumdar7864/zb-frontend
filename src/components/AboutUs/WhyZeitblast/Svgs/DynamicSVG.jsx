import React from 'react';

const DynamicSVG = ({
  width = "55",
  height = "56",
  viewBox = "0 0 55 56",
  path,
  color
  
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={path} />
    </svg>
  );
};

export default DynamicSVG;
