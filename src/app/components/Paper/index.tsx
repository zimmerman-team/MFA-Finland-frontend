import React, { ReactNode } from "react";
import MUIPaper from "@material-ui/core/Paper";

interface PaperProps {
  children: ReactNode;
  padding?: boolean;
  width?: number;
  height?: number;
  noMargin?: boolean;
  centerContent?: boolean;
  overflow?: boolean;
  backgroundColor?: string;
  wrap?: boolean;
  paddingBottom?: number;
}
export const Paper = (props: PaperProps) => (
  <MUIPaper
    elevation={0}
    css={`
      border-radius: 16px;
      display: flex;
      flex-wrap: ${props.wrap ? "wrap" : "unset"};
      margin: ${props.noMargin ? "initial" : "0px"};
      overflow: ${props.overflow ? "visible" : "hidden"};
      padding: ${props.padding ? "16px" : "initial"};
      height: ${props.height ? `${props.height}px` : "initial"};
      width: ${props.width ? `${props.width}px` : "initial"};
      align-content: ${props.height ? "space-between" : "initial"};
      flex-direction: column;
      background-color: white;
      justify-content: ${props.centerContent ? "center" : "initial"};
      align-items: ${props.centerContent ? "center" : "initial"};
      background: ${props.backgroundColor ? props.backgroundColor : "white"};
      box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.12);
    `}
  >
    {props.children}
  </MUIPaper>
);
