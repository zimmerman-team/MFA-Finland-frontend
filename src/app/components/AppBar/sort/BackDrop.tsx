import React from "react";

export const BackDrop = (color: string) => (
  <div
    // todo: move elsewhere
    css={`
      z-index: 101; //mui-datatable header has a default z-index of 100...
      top: 0;
      left: 0;
      position: fixed;
      background-color: #2e4982;
      height: 68px;
      width: 100vw;
      @media (max-width: 600px) {
        height: 56px;
      }
    `}
  />
);
