import React from "react";
import "./shimmer.css";

const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {new Array(10).fill(0).map((e, i) => (
        <div key={i} className="shimmer">
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
