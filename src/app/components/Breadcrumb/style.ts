import { css } from "styled-components/macro";
import theme from "app/theme";

export const BreadcrumbItemStyle = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  /* color: red; */
  color: #888888;
`;
export const BreadcrumbActiveItemStyle = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  /* color: ${theme.palette.text.primary}; ; */
  /* color: #888888; */
  color: #2e4982;
`;
export const BreadcrumbContainerStyle = css`
  display: flex;
  height: 32px;
  align-items: center;
`;
