import React from "react";
import { css } from "styled-components/macro";
import { FormControl, OutlinedInput, Typography } from "@material-ui/core";

interface FieldProps {
  label: string;
  value: string;
  error: boolean;
  // eslint-disable-next-line react/require-default-props
  errorMessage?: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  // eslint-disable-next-line react/require-default-props
  isMultiline?: boolean;
}
export const FormField = (props: FieldProps) => {
  const fieldStyles = {
    container: css`
      margin-bottom: 16px;
    `,
    label: css`
      margin-bottom: 4px;
    `,
    error: css`
      margin-top: 8px;
      color: #ae4764;
      margin-bottom: 8px;
    `,
    fieldset: css`
      ${props.error &&
      `
            && > fieldset {
        border-color: #ae4764 !important;
        background-color: #edd2da;
      }
            `}
    `,
  };
  return (
    <FormControl
      variant="outlined"
      fullWidth
      hiddenLabel
      css={fieldStyles.container}
    >
      <label htmlFor={props.label} css={fieldStyles.label}>
        {props.label}
      </label>
      <OutlinedInput
        id={props.label}
        value={props.value}
        rows={4}
        onChange={(e) => props.handleChange(e)}
        error={props.error}
        multiline={props.isMultiline}
        css={fieldStyles.fieldset}
      />
      {props.error && (
        <Typography variant="subtitle2" css={fieldStyles.error}>
          {props.errorMessage}
        </Typography>
      )}
    </FormControl>
  );
};
