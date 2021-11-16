import React from "react";
import get from "lodash/get";
import { css } from "styled-components/macro";
import { PrimaryColor } from "app/theme";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Typography,
  FormControlLabel,
} from "@material-ui/core";
import { ArrowDropDown } from "@material-ui/icons";
import { FilterOption } from "app/components/FilterPanel/data";

interface AccordionListItemProps {
  selected: boolean;
  node: FilterOption;
  component: React.ReactElement;
  nodeStyle: "has1NodeStyle" | "has2NodesStyle";
  onFilterCheckboxChange: (value: string | string[]) => void;
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
        background-color: #002561;
        min-height: 42px !important;
        border-bottom: 1px solid white;

        * > span {
          color: white;
        }

        && > div {
          margin: 0;
          align-items: center;
        }

        // background-color: ${PrimaryColor[0]};

        @media (max-width: 600px) {
          //background-color: red;
        }
      `,
      checkbox: css`
        color: white;
        margin-left: 0;
      `,
      details: css`
        background-color: #002561;
        // background-color: ${PrimaryColor[0]};
        padding: ${props.nodeStyle === "has2NodesStyle"
          ? "16px 0px 16px 80px"
          : "32px 16px 24px 80px"};
        display: flex;
        flex-direction: column;

        @media (max-width: 600px) {
          font-size: 14px;
          padding: ${props.nodeStyle === "has2NodesStyle"
            ? "16px 0px 16px 32px"
            : "32px 16px 24px 32px"};
        }
      `,
      label: css`
        color: white;
        @media (max-width: 600px) {
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; /* number of lines to show */
          -webkit-box-orient: vertical;
          //padding: initial;
        }
      `,
      formControl: css`
        margin-left: 0;
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
        <FormControlLabel
          label=""
          aria-label="checkbox"
          onClick={(event: any) => event.stopPropagation()}
          onFocus={(event: any) => event.stopPropagation()}
          css={styles.formControl}
          control={
            <Checkbox
              color="default"
              css={styles.checkbox}
              checked={props.selected}
              onChange={() => {
                let params: string[] = [props.node.code];
                get(props, "node.children", []).forEach((c: FilterOption) => {
                  params = [...params, c.code];
                  if (c.children) {
                    c.children.forEach((cc: FilterOption) => {
                      params = [...params, cc.code];
                      if (cc.children) {
                        params = [
                          ...params,
                          ...cc.children.map((ccc: FilterOption) => ccc.code),
                        ];
                      }
                    });
                  }
                });
                props.onFilterCheckboxChange(params);
              }}
            />
          }
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
