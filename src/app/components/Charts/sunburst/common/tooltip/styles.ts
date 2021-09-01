import { css } from "styled-components/macro";
import { PrimaryColor, SecondaryColor } from "app/theme";

export const tooltipcss = css`
  z-index: 9999;
  width: 300px;
  padding: 15px;
  display: flex;
  font-size: 14px;
  background: #fff;
  position: absolute;
  border-radius: 15px;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.12);

  @media (max-width: 767px) {
    padding: 0;
    box-shadow: none;
    position: initial;
  }
`;

export const tooltiprowcss = css`
  gap: 20px;
  width: 100%;
  display: flex;
  color: #2e4063;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const progressbarcontainercss = css`
  width: 100%;
  height: 4px;
  border-radius: 10px;
  background-color: ${SecondaryColor[1]};
`;

export const progressbarcss = (value: number) => css`
  height: 4px;
  border-radius: 2px;
  width: ${value > 100 ? 100 : value}%;
  background-color: ${PrimaryColor[0]};
`;
