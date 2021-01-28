import React from "react";
import { SimpleInterpolation } from "styled-components/macro";
import { Button, ButtonProps } from "@material-ui/core/";

interface PillButton extends ButtonProps {
  css?: readonly SimpleInterpolation[];
}

export const PillButton = (props: PillButton) => {
  return (
    <Button css={props.css} variant="contained" color="primary" {...props}>
      {props.children}
    </Button>
  );
};
