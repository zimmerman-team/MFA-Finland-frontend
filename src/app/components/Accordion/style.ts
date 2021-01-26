import { css } from "styled-components/macro";

export const AccordionHeaderStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  width: 100%;
  background-color: #f7f7f7;
  padding-left: 16px;
  padding-right: 16px;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #2e4063;
  cursor: pointer;
  user-select: none;
  z-index: 1000;
`;

export const AccordionStyle = (accordionState: any) => css`
  position: relative;
  overflow: hidden;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: ${accordionState ? "0px 0px 16px 16px" : "0 0 0 0"};
  height: ${accordionState ? "100%" : "48px"};
  margin-bottom: 16px;
`;

export const AccordionContentStyle = css`
  padding: 16px;
`;
