import React from "react";
import { Rings } from "react-loader-spinner";

const Loading = ({ height, width, radius, widthContainer }) => {
  return (
    <div className={`w-${widthContainer} flex justify-center`}>
      <Rings
        height={height}
        width={width}
        color="#4446EF"
        radius={radius}
        visible={true}
        ariaLabel="rings-loading"
      />
    </div>
  );
};

export default Loading;
