import { css } from "styled-components/macro";
import { SecondaryColor } from "app/theme";

export const containercss = css`
  padding: 16px;
  height: fit-content;
  background-color: #f8f8f8;
  z-index: 1;
  @media (max-width: 992px) {
    padding: 16px 12px;
  }

  @media (max-width: 600px) {
    background-color: white;
    padding: 0;

    box-shadow: -100px 0px 0px 0px white,
      100px 0px 0px 0px white};
  }
`;

export const buttonscontainercss = css`
  display: flex;
  padding: 8px 24px;
  flex-direction: row;
  @media (max-width: 992px) {
    padding: 8px 0;
  }
`;

export const dividercss = css`
  width: calc(100% - 12px);
  margin-top: 16px;
  border-bottom: 1px solid ${SecondaryColor[1]};
`;
