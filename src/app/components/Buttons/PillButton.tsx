import React from "react";
import { css, SimpleInterpolation } from "styled-components/macro";
import { Button, ButtonProps } from "@material-ui/core/";

interface PillButton extends ButtonProps {
  css: readonly SimpleInterpolation[];
}

export const PillButton = (props: PillButton) => {
  return (
    <Button {...props} css={props.css} variant="contained" color="primary">
      {props.children}
    </Button>
  );
};
