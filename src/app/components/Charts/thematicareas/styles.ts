import { PrimaryColor } from "app/theme";
import { css } from "styled-components/macro";

export const containercss = css`
  width: 320px;
  height: 320px;
  display: flex;
  border-radius: 50%;
  position: relative;
  background: #ecf1fa;
`;

export const itemcirclecss = (
  size: number,
  color: string,
  directions: string[]
) => {
  const interval = size / 5;
  return css`
    width: ${size}px;
    height: ${size}px;
    position: absolute;
    ${directions[0]}: 0;
    ${directions[1]}: calc(100% / 2 - ${size / 2}px);

    > div {
      border-radius: 50%;
      position: absolute;
      background: ${color};
    }

    > div:nth-of-type(1) {
      opacity: 0.2;
      width: ${size}px;
      height: ${size}px;
      ${directions[0]}: 0;
      ${directions[1]}: calc(100% / 2 - ${(interval * 5) / 2}px);
    }
    > div:nth-of-type(2) {
      opacity: 0.3;
      width: ${interval * 4}px;
      height: ${interval * 4}px;
      ${directions[0]}: ${(size - interval * 4) / 3}px;
      ${directions[1]}: calc(100% / 2 - ${(interval * 4) / 2}px);
    }
    > div:nth-of-type(3) {
      opacity: 0.5;
      width: ${interval * 3}px;
      height: ${interval * 3}px;
      ${directions[0]}: ${(size - interval * 3) / 3}px;
      ${directions[1]}: calc(100% / 2 - ${(interval * 3) / 2}px);
    }
    > div:nth-of-type(4) {
      opacity: 0.6;
      width: ${interval * 2}px;
      height: ${interval * 2}px;
      ${directions[0]}: ${(size - interval * 2) / 3}px;
      ${directions[1]}: calc(100% / 2 - ${(interval * 2) / 2}px);
    }
    > div:nth-of-type(5) {
      opacity: 1;
      width: ${interval * 1}px;
      height: ${interval * 1}px;
      ${directions[0]}: ${(size - interval * 1) / 3}px;
      ${directions[1]}: calc(100% / 2 - ${(interval * 1) / 2}px);

      &:hover {
        cursor: pointer;
        > span {
          font-weight: 700;
        }
      }
      > span {
        color: #fff;
        font-size: 11px;
        pointer-events: none;
      }
    }
  `;
};

export const singleitemcontainercss = css`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  > svg {
    top: 0;
    left: 0;
    cursor: pointer;
    position: absolute;

    &:hover {
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.2);
    }
  }

  > span {
    right: 5%;
    font-size: 14px;
    font-weight: 700;
    position: absolute;
    color: ${PrimaryColor[0]};
  }
`;

export const singleitemcss = (
  color: string,
  directions: string[],
  values: string[]
) => {
  const size = 320;
  const interval = size / 5;
  return css`
    width: ${size}px;
    height: ${size}px;
    position: absolute;
    ${directions[0]}: 0;
    ${directions[1]}: calc(100% / 2 - ${size / 2}px);

    > div {
      border-radius: 50%;
      position: absolute;
      background: ${color};
    }

    > div:nth-of-type(1) {
      opacity: 0.2;
      width: ${size}px;
      height: ${size}px;
      ${directions[0]}: 0;
      ${directions[1]}: calc(100% / 2 - ${(interval * 5) / 2}px);
    }
    > div:nth-of-type(2) {
      opacity: 0.3;
      width: ${interval * 4}px;
      height: ${interval * 4}px;
      ${directions[0]}: ${(size - interval * 4) / 2}px;
      ${directions[1]}: calc(100% / 2 - ${(interval * 4) / 2}px);
    }
    > div:nth-of-type(3) {
      opacity: 0.5;
      width: ${interval * 3}px;
      height: ${interval * 3}px;
      ${directions[0]}: ${(size - interval * 3) / 2}px;
      ${directions[1]}: calc(100% / 2 - ${(interval * 3) / 2}px);
    }
    > div:nth-of-type(4) {
      opacity: 0.6;
      width: ${interval * 2}px;
      height: ${interval * 2}px;
      ${directions[0]}: ${(size - interval * 2) / 2}px;
      ${directions[1]}: calc(100% / 2 - ${(interval * 2) / 2}px);
    }
    > div:nth-of-type(5) {
      opacity: 1;
      border: 1px solid #fff;
      width: ${interval * 1}px;
      height: ${interval * 1}px;
      ${directions[0]}: ${(size - interval * 1) / 2}px;
      ${directions[1]}: calc(100% / 2 - ${(interval * 1) / 2}px);

      &:before {
        width: 249px;
        left: -250px;
        display: flex;
        position: absolute;
        padding-bottom: 25px;
        content: "${values[0]}";
        color: ${PrimaryColor[0]};
        top: ${interval / 2 - 40}px;
        border-bottom: 1px solid ${PrimaryColor[0]};
      }

      &:after {
        width: 249px;
        left: -250px;
        display: flex;
        font-weight: 700;
        position: absolute;
        content: "${values[1]}";
        color: ${PrimaryColor[0]};
        top: ${interval / 2 - 20}px;
      }
    }

    &:before {
      bottom: 0;
      width: 269px;
      left: -125px;
      display: flex;
      position: absolute;
      padding-bottom: 5px;
      content: "${values[2]}";
      color: ${PrimaryColor[0]};
      border-bottom: 1px solid ${PrimaryColor[0]};
    }
  `;
};
