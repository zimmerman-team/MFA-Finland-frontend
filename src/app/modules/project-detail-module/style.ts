import theme from "app/theme";
import { css } from "styled-components/macro";

export const FieldOneStyle = css`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  text-transform: uppercase;
  letter-spacing: 0.250795px;
  color: ${theme.palette.text.primary};

  @media (max-width: 600px) {
    font-size: 12px;
  }
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

  @media (max-width: 600px) {
    font-size: 24px !important;
    font-weight: bold;
  }
`;

export const TextHighlightStyle = css`
  color: ${theme.palette.text.primary};
  font-weight: 500;
  width: 70%;
`;

export const DescriptionLabelStyle = css`
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  color: #2e4982;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

export const DescriptionStyle = css`
  font-family: Finlandica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;

  /* Primary/Blue */

  color: #2e4982;
  //@media (max-width: 600px) {
  //  font-size: 12px;
  //}
`;
