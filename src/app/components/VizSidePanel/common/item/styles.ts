import { SecondaryColor } from "app/theme";
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
  padding: 16px 16px ${expanded ? "0px" : "16px"} 16px;
  opacity: ${selected || isChild || hasChildren ? 1 : 0.5};

  ${isChild ||
  vizType === "sectors" ||
  vizType === "organisations" ||
  vizType === "countries-regions"
    ? ""
    : `
      border-bottom: 1px solid rgba(188, 198, 214, 1);

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
`;

export const expandiconcss = (expanded: boolean) => css`
  right: 0;
  bottom: -3px;
  font-size: 25px;
  position: absolute;
  transition: all 0.2s ease-in-out;
  ${!expanded ? "" : "transform: rotate(180deg);"}
`;
