import React from "react";

export function VizLoader() {
  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      `}
    >
      <div>Loading...</div>
    </div>
  );
}
