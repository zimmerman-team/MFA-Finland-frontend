import { PrimaryColor } from "app/theme";
import { hexToRGBA } from "app/utils/hexToRgba";
import { css } from "styled-components/macro";

export const containercss = css`
  width: 180px;
  height: 180px;
  display: flex;
  max-width: 180px;
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

      // &:hover {
      //   cursor: pointer;
      //   > div {
      //     font-weight: 700;
      //   }
      // }
      > div {
        width: 80px;
        color: #fff;
        font-size: 10px;
        text-align: center;
        margin-left: -20px;
        pointer-events: none;
      }
    }
  `;
};

const itemlabellinecss = [
  `
    display: inline-block;
    left: 53%;
    top: 45px;
    content: "";
    height: 25px;
    position: absolute;
    transform: rotate(-32deg);
    border-right: 1px solid #2E4982;
  `,
  `
    display: inline-block;
    left: -23%;
    content: "";
    width: 60px;
    bottom: -32px;
    position: absolute;
    transform: rotate(-70deg);
    border-bottom: 1px solid #2E4982;
  `,
  `
    display: inline-block;
    left: 19%;
    content: "";
    height: 25px;
    bottom: 48px;
    position: absolute;
    transform: rotate(-10deg);
    border-right: 1px solid #2E4982;
  `,
  `
    display: inline-block;
    top: -50%;
    right: -15%;
    content: "";
    width: 35px;
    position: absolute;
    transform: rotate(-65deg);
    border-top: 1px solid #2E4982;
  `,
];

const itemlabeltextcss = [
  `
    left: 0;
    top: -35%;
  `,
  `
    top: 0%;
    right: -60%;
  `,
  `    
    right: 0%;
    bottom: -40%;
  `,
  `
    bottom: 0%;
    left: -60%;
  `,
];

export const itemcirclelabelcss = (index: number) => css`
  width: 105px;
  font-size: 10px;
  position: absolute;
  ${itemlabeltextcss[index]}

  &:after {
    ${itemlabellinecss[index]}
  }
`;

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
    max-width: 20%;
    font-size: 14px;
    font-weight: 700;
    line-height: 15px;
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

export const rightsideinfopanel = css`
  display: flex;
  padding-left: 150px;
  flex-direction: column;

  @media (max-width: 1280px) {
    padding-right: 50px;
  }
`;

export const rightsideinfopaneltitle = css`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 32px;
  color: ${PrimaryColor[0]};
`;

export const rightsideinfopanelitem = css`
  margin-bottom: 32px;

  > div:nth-of-type(1) {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 9px;
    color: ${PrimaryColor[0]};
  }
`;

export const progresscontainercss = (color: string, percentage: number) => css`
  height: 8px;
  margin-bottom: 6px;
  border-radius: 13px;
  width: ${percentage}%;
  background: ${hexToRGBA(color, 0.5)};
  border: 1px solid ${hexToRGBA(color, 0.5)};
`;

export const progressfillcss = (color: string, percentage: number) => css`
  height: 6px;
  background: ${color};
  border-radius: 13px 0 0 13px;
  width: ${percentage > 100 ? 100 : percentage}%;
`;

export const rightsideinfopanelvalues = css`
  font-size: 10px;
`;
