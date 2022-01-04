import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { languageAtom } from "app/state/recoil/atoms";

interface LinkCellModel {
  value: string | string[] | number | JSX.Element;
  link: string;
  extLink?: boolean;
  colSpan?: number;
}

export const LinkCell = (props: LinkCellModel) => {
  const [currentLanguage] = useRecoilState(languageAtom);

  if (props.extLink) {
    return (
      <a href={props.link} target="_blank" rel="noopener noreferrer">
        {props.value}
      </a>
    );
  }
  return (
    <Link
      to={`/${currentLanguage === "se" ? "sv" : currentLanguage}${props.link}`}
    >
      {props.value}
    </Link>
  );
};
