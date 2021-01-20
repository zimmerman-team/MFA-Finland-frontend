import { PrimaryColor } from "app/theme";
import { css } from "styled-components/macro";

export const totalcss = css`
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const backbuttoncss = css`
  z-index: 1;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  padding: 6px 12px;
  user-select: none;
  font-weight: bold;
  text-align: center;
  border-radius: 20px;
  background: ${PrimaryColor[0]};
`;
