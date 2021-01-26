import React from "react";

interface ElementBackgroundProps {
  backgroundColor: string;
}
export const ElementBackground = (props: ElementBackgroundProps) => (
  <div
    css={`
      position: absolute;
      left: -25vw;
      top: 0;
      height: 100%;
      width: 125vw;
      z-index: -1;
      background-color: ${props.backgroundColor};
    `}
  />
);
