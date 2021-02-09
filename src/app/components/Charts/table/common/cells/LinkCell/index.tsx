import React from "react";
import { Link } from "react-router-dom";

interface LinkCellModel {
  value: string | string[] | number | JSX.Element;
  link: string;
  extLink?: boolean;
  colSpan?: number;
}

export const LinkCell = (props: LinkCellModel) => {
  if (props.extLink) {
    return (
      <a href={props.link} target="_blank" rel="noopener noreferrer">
        {props.value}
      </a>
    );
  }
  return <Link to={props.link}>{props.value}</Link>;
};
