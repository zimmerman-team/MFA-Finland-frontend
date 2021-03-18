import { PrimaryColor, SecondaryColor } from "app/theme";
import { css } from "styled-components/macro";

const padding = (
  hasCircle: boolean,
  expanded: boolean,
  vizType: string,
  isChild?: boolean
) => {
  if (hasCircle && isChild) {
    return "8px 0px 8px 0px";
  }
  if (hasCircle && expanded) {
    return "8px 24px 8px 24px";
  }
  if (hasCircle) {
    return "8px 24px 8px 24px";
  }
  if (!isChild && vizType === "oda") {
    return "12px 0px 12px 24px";
  }
  if (vizType === "oda") {
    return "8px 0";
  }
  if (expanded) {
    return "12px 24px 8px 24px";
  }
  return "12px 24px 12px 24px";
};

export const containercss = (
  expanded: boolean,
  selected: boolean,
  hasChildren: boolean,
  vizType: string,
  hasCircle: boolean,
  isChild?: boolean
) => css`
  display: flex;
  flex-direction: column;
  ${selected ? "padding-left: 16px;" : ""}
  transition: background 0.2s ease-in-out;
  padding: ${padding(hasCircle, expanded, vizType, isChild)};
  // :last-child {
  //   padding-bottom: ${vizType === "oda" ? "0" : "initial"};
  // }
  padding-top: ${expanded && vizType === "oda" ? "16px" : "12px"};
  opacity: ${selected || isChild || hasChildren ? 1 : 0.5};

  ${isChild ||
  vizType === "sectors" ||
  vizType === "organisations" ||
  vizType === "countries-regions" ||
  vizType === "thematic-areas"
    ? ""
    : `
      border-bottom: 1px solid ${SecondaryColor[1]};

      ${
        !expanded
          ? `
        &:hover {
          background: ${SecondaryColor[0]};
        }
      `
          : ""
      }
  `}

  ${(vizType === "sectors" ||
    vizType === "organisations" ||
    vizType === "countries-regions") &&
  hasChildren &&
  !selected
    ? `
      &:hover {
        background: ${SecondaryColor[0]};
      }
    `
    : ""}
`;

export const circlecss = (color: string) => css`
  width: 12px;
  height: 12px;
  margin-right: 10px;
  //margin-left: -16px;
  border-radius: 50%;
  background: ${color};
  border: 0.5px solid #343249;
  transform: translateY(2.2px);
`;

export const expandiconcss = (expanded: boolean) => css`
  bottom: -4px;
  right: 0;
  font-size: 25px;
  position: absolute;
  transition: all 0.2s ease-in-out;
  ${!expanded ? "" : "transform: rotate(180deg);"}
  * > svg {
    fill: ${PrimaryColor[0]};
  }
`;
