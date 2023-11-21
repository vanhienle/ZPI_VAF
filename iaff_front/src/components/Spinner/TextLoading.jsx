import React from "react";
import { ThreeDots } from "react-loader-spinner";

const TextLoading = ({ width, height, radius }) => {
  return (
    <div>
      <ThreeDots
        height={height}
        width={width}
        radius={radius}
        color="#4446EF"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default TextLoading;
