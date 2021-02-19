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
      z-index: 0;
      background-color: ${props.backgroundColor};
      @media (max-width: 768px) {
        left: -16px;
        width: 100vw;
      }
    `}
  />
);
