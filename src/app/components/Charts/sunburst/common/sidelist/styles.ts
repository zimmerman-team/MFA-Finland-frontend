import { css } from "styled-components/macro";

export const containercss = css`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  &::-webkit-scrollbar {
    width: 6px;
    background: #ededf6;
  }
  &::-webkit-scrollbar-track {
    border-radius: 4px;
    background: #ededf6;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #2e4063;
  }
`;

export const listheadercss = css`
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  margin-bottom: 16px;
`;

export const listcountcss = css`
  font-size: 40px;
  font-weight: bold;
  font-style: normal;
  margin-bottom: 24px;
`;

export const listitemcss = (isClickable?: boolean) => css`
  z-index: 2;
  width: 100%;
  display: flex;
  margin-bottom: 2px;
  font-size: 10px;
  flex-direction: row;
  align-items: center;

  &:first-of-type {
    margin-top: 0px;
  }

  &:last-of-type {
    margin-bottom: 0px;
  }

  > div:nth-of-type(2) {
    width: calc(100% - 22px);
  }

  :hover {
    cursor: ${isClickable ? "pointer" : "unset"};
  }
`;

export const listitemcirclecss = (color: string) => css`
  width: 11px;
  height: 11px;
  margin-right: 10px;
  border-radius: 50%;
  background: ${color};
  border: 1px solid #fff;
`;

export const gradientlinecss = (colors: string[]) => css`
  left: 0;
  top: 10px;
  z-index: 1;
  width: 11px;
  position: absolute;
  border-radius: 10px;
  height: calc(100% - 15px);
  background: linear-gradient(to bottom, ${colors.join(",")});
`;

export const listitemcopy = () => css`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  /* identical to box height, or 180% */
  line-height: 18px;
  /* Primary color / main text */
  color: #2e4063;
`;
