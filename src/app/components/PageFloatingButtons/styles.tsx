import { css } from "styled-components/macro";

export const containercss = css`
  top: 20px;
  right: -32px;
  position: absolute;
`;

export const buttonscontainercss = css`
  display: flex;
  position: fixed;
  flex-direction: column;
`;

export const buttoncss = css`
  width: 32px;
  height: 32px;
  margin: 8px 0;
  display: flex;
  cursor: pointer;
  background: #fff;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0px 1px 8px rgba(0, 0, 0, 0.12));
`;
