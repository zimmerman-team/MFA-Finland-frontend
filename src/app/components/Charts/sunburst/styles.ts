import { css } from "styled-components/macro";

export const containercss = css`
  //width: 100%;
  display: flex;
  //height: 600px;
  position: relative;
  //flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 32px;

  div:nth-of-type(2) {
    z-index: 2;
  }

  path {
    cursor: pointer;
  }
`;
