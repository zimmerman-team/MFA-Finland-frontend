import { SecondaryColor } from "app/theme";
import { css } from "styled-components/macro";

export const containercss = (
  expanded: boolean,
  selected: boolean,
  hasChildren: boolean,
  isChild?: boolean
) => css`
  display: flex;
  flex-direction: column;
  padding: 16px 16px ${expanded ? "0px" : "16px"} 16px;
  ${selected ? "padding-left: 16px;" : ""}
  opacity: ${selected || isChild || hasChildren ? 1 : 0.5};

  ${isChild
    ? ""
    : `
      transition: background 0.2s ease-in-out;
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
  bottom: 0;
  right: 10px;
  font-size: 25px;
  position: absolute;
  transition: all 0.2s ease-in-out;
  ${!expanded ? "" : "transform: rotate(180deg);"}
`;
