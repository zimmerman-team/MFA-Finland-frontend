import { PrimaryColor, SecondaryColor } from "app/theme";
import { css } from "styled-components/macro";

export const containercss = (
  expanded: boolean,
  selected: boolean,
  hasChildren: boolean,
  vizType: string,
  isChild?: boolean
) => css`
  display: flex;
  flex-direction: column;
  ${selected ? "padding-left: 16px;" : ""}
  transition: background 0.2s ease-in-out;
  padding: 12px 24px ${expanded ? "0px" : "12px"} 24px;
  opacity: ${selected || isChild || hasChildren ? 1 : 0.5};

  ${isChild ||
  vizType === "sectors" ||
  vizType === "organisations" ||
  vizType === "countries-regions"
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
  margin-left: -16px;
  border-radius: 50%;
  background: ${color};
  border: 0.5px solid #323232;
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
