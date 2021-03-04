import { css } from "styled-components/macro";

export const containercss = css`
  width: 100%;
  display: flex;
  position: relative;
  padding-left: 16px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const linearprogresscss = (width: number, loading: boolean) => css`
  z-index: 10;
  width: ${width}px;
  visibility: ${loading ? "visible" : "hidden"};
  > div {
    height: 2px;
    background-color: #ededf6;
  }
`;
