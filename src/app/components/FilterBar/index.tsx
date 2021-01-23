import { SecondaryColor } from "../../theme";
import React from "react";

export const FilterBar = () => {
  return (
    <div
      css={`
        height: 68px;
        width: 100%;
        background-color: ${SecondaryColor[0]};
        position: sticky;
        top: 68px;
      `}
    />
  );
};
