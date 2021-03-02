import { css } from "styled-components/macro";

export const containercss = css`
  padding: 16px;
  height: fit-content;
  @media (max-width: 992px) {
    padding: 16px 12px;
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
  width: 100%;
  margin-top: 16px;
  border-bottom: 1px solid rgba(188, 198, 214, 1);
`;
