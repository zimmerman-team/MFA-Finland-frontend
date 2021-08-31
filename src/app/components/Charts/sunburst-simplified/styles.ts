import { css } from "styled-components/macro";

export const containercssSimplified = css`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;

  div:nth-of-type(2) {
    z-index: 2;
  }

  path {
    cursor: pointer;
  }
`;
