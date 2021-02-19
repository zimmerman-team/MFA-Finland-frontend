import React from "react";
import { css } from "styled-components/macro";
import { PrimaryColor } from "app/theme";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Typography,
} from "@material-ui/core";
import { ArrowDropDown } from "@material-ui/icons";
import { FilterOption } from "app/components/FilterPanel/data";

interface AccordionListItemProps {
  selected: boolean;
  node: FilterOption;
  component: React.ReactElement;
  style: "has1NodeStyle" | "has2NodesStyle";
}

export const AccordionListItem = (props: AccordionListItemProps) => {
  const createStyles = () => {
    return {
      container: css`
        box-shadow: none;
        margin: 0 0 8px 0 !important;

        @media (max-width: 600px) {
          margin: initial;
        }
      `,
      summary: css`
        margin: 0;
        padding: 0;
        box-shadow: none;
        color: white;
        height: 42px !important;
        min-height: 42px !important;
        border-bottom: 1px solid white;

        * > span {
          color: white;
        }

        && > div {
          margin: 0;
          align-items: center;
        }

        background-color: ${PrimaryColor[0]};

        @media (max-width: 600px) {
          //background-color: red;
        }
      `,
      checkbox: css`
        color: white;
      `,
      details: css`
        background-color: ${PrimaryColor[0]};
        padding: ${props.style == "has2NodesStyle"
          ? "16px 0px 16px 80px"
          : "32px 16px 24px 80px"};
        display: flex;
        flex-direction: column;

        @media (max-width: 600px) {
          font-size: 14px;
          padding: ${props.style == "has2NodesStyle"
            ? "16px 0px 16px 40px"
            : "32px 16px 24px 40px"};
        }
      `,
      label: css`
        color: white;
        @media (max-width: 600px) {
          font-size: 14px;
          //padding: initial;
        }
      `,
    };
  };

  const styles = createStyles();

  return (
    <Accordion css={styles.container}>
      <AccordionSummary
        expandIcon={<ArrowDropDown />}
        aria-label="Expand"
        aria-controls="expand-filter"
        id="expand-filter"
        css={styles.summary}
      >
        <Checkbox
          color="default"
          css={styles.checkbox}
          checked={props.selected}
        />
        <Typography variant="h6" css={styles.label}>
          {props.node.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails css={styles.details}>
        {props.component}
      </AccordionDetails>
    </Accordion>
  );
};
