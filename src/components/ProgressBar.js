import React from "react";

export const ProgressBar = ({ current, max }) => {
  const width = (current / max) * 100;
  return (
    <div id="progressBar">
      <div id="progressBarFull" style={{ width: `${width}%` }}></div>
    </div>
  );
};
