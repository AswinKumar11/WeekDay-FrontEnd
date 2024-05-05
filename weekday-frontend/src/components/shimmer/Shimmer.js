import React from "react";
import "./shimmer.css";

const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {new Array(10).fill(0).map((e, i) => (
        <div className="shimmer">
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
