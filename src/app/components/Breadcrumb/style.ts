import { css } from "styled-components/macro";
import theme, { PrimaryColor } from "app/theme";

export const BreadcrumbItemStyle = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #888888;
  text-decoration-line: underline;

  :hover {
    color: ${PrimaryColor[3]};
    text-decoration-line: underline;
  }
`;
export const BreadcrumbActiveItemStyle = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: ${PrimaryColor[0]};
`;
export const BreadcrumbContainerStyle = css`
  display: flex;
  height: 32px;
  align-items: center;
  .MuiBreadcrumbs-separator {
    margin: 0;
  }
`;
