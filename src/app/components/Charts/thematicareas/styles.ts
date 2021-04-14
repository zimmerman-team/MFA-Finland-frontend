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

const itemlabellinecardcss = [
  `
    display: inline-block;
    left: 68%;
    top: 55%;
    content: "";
    height: 155%;
    position: absolute;
    transform: rotate(-57deg);
    border-right: 1px solid #2E4982;
  `,
  `
    display: inline-block;
    left: 3%;
    content: "";
    width: 30%;
    bottom: -50%;
    position: absolute;
    transform: rotate(-70deg);
    border-bottom: 1px solid #2E4982;
  `,
  `
    display: inline-block;
    left: 19%;
    content: "";
    height: 17px;
    bottom: 48px;
    position: absolute;
    transform: rotate(-36deg);
    border-right: 1px solid #2E4982;
  `,
  `
    display: inline-block;
    top: -64%;
    right: 27%;
    content: "";
    width: 62px;
    position: absolute;
    transform: rotate(-54deg);
    border-top: 1px solid #2E4982;
  `,
];

const itemlabeltextcardcss = [
  `
    width: 150px;
    left: -44%;
    top: -27%;
  `,
  `
    top: -13%;
    right: -50%;
  `,
  ` 
    width: 153px;   
    right: -40%;
    bottom: -25%;
  `,
  `
    width: 144px;
    bottom: -22%;
    left: -44%;
  `,
];

const itemlabellinevizcss = [
  `
    display: inline-block;
    left: 68%;
    top: 95%;
    content: "";
    height: 265%;
    position: absolute;
    transform: rotate(-46deg);
    border-right: 1px solid #2E4982;
  `,
  `
    display: inline-block;
    left: -1%;
    content: "";
    width: 36%;
    bottom: -30px;
    position: absolute;
    transform: rotate(-70deg);
    border-bottom: 1px solid #2E4982;
  `,
  `
    display: inline-block;
    left: 19%;
    content: "";
    height: 35px;
    bottom: 25px;
    position: absolute;
    transform: rotate(-36deg);
    border-right: 1px solid #2E4982;
  `,
  `
    display: inline-block;
    top: -122%;
    right: 21%;
    content: "";
    width: 69px;
    position: absolute;
    transform: rotate(-60deg);
    border-top: 1px solid #2E4982;
  `,
];

const itemlabeltextvizcss = [
  `
    width: 150px;
    left: -44%;
    top: -27%;
  `,
  `
    top: -13%;
    right: -50%;
  `,
  ` 
    width: 153px;   
    right: -40%;
    bottom: -25%;
  `,
  `
    width: 144px;
    bottom: -22%;
    left: -44%;
  `,
];

export const itemcirclelabelcss = (
  index: number,
  vizView?: boolean,
  linkable?: boolean
) => css`
  width: 105px;
  font-size: 11px;
  position: absolute;
  ${vizView ? itemlabeltextvizcss[index] : itemlabeltextcardcss[index]}

  &:after {
    ${vizView ? itemlabellinevizcss[index] : itemlabellinecardcss[index]}
  }

  &:hover {
    cursor: ${linkable ? "pointer" : ""};
    text-decoration: ${linkable ? "underline" : ""};
  }
`;

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
