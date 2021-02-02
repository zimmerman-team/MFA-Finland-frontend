import theme from "app/theme";
import { css } from "styled-components/macro";

export const FieldOneStyle = css`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  text-transform: uppercase;
  letter-spacing: 0.250795px;
  color: rgba(1, 1, 10, 0.6);
`;

export const FieldTwoStyle = css`
  font-style: normal;
  font-weight: 500;
  font-size: 48px;
  line-height: 1;
  color: ${theme.palette.text.primary};

  @media (max-width: 960px) {
    font-size: 30px !important;
  }
`;

export const TextHighlightStyle = css`
  color: ${theme.palette.text.primary};
  font-weight: 500;
`;

export const DescriptionLabelStyle = css`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #2e4063;
`;
