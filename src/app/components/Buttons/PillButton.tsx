import React from "react";
import { css } from "styled-components/macro";
import { Button, ButtonProps } from "@material-ui/core/";

export const buttonStyles = css`
  border-radius: 20px;
  text-transform: unset;
  padding: 4px 12px;
  line-height: 17px;
`;

export const PillButton = (props: ButtonProps) => {
  return (
    <Button {...props} css={buttonStyles} variant="contained" color="primary">
      {props.children}
    </Button>
  );
};
