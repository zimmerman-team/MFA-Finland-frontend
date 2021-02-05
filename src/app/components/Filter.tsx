import React from "react";
import { useLocation } from "react-router-dom";

interface FilterProps {
  show?: boolean;
}

export const Filter = (props: FilterProps) => {
  let location = useLocation();

  const arrayOfStrings = ["/about", "/feedback", "/statement", "/project"];
  const str = location.pathname;
  const found = arrayOfStrings.find((v) => str === v);

  if (found === undefined) {
    return (
      <React.Fragment>
        <div
          css={`
            position: sticky;
            top: 64px;
            margin-bottom: 16px;
            height: 64px;
            display: flex;
            justify-content: center;
            background-color: #ecf1fa;
            z-index: 2;
          `}
        />
        <div
          css={`
            z-index: -1;
            top: 64px;
            left: 0;
            position: fixed;
            background-color: #ecf1fa;
            height: 64px;
            width: 100vw;
          `}
        />{" "}
      </React.Fragment>
    );
  } else {
    return null;
  }
};
