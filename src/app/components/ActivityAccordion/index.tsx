import React from "react";
import { Typography } from "@material-ui/core";
import MUIAccordionSummary from "@material-ui/core/AccordionSummary";
import MUIAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ProjectTypography } from "app/theme";

import { Anchor } from "app/components/InPageNavigation";
import { ActivityItemProps } from "app/components/ActivityAccordion/model";
import { getAccordionContent } from "app/components/utils/getAccordionContent";
import { AccordionStyle } from "app/components/ActivityAccordion/style";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";

export const ActivityAccordion = (props: ActivityItemProps) => {
  return (
    <React.Fragment>
      <Anchor id={props.id} positionRelativeToTop={64} />

      <div css={AccordionStyle(props.expanded)} id={`${props.id}-content`}>
        <MUIAccordionSummary
          onClick={() =>
            props.handleClick &&
            props.handleClick(props.expanded ? -1 : props.index)
          }
          aria-controls={`${props.id}-content`}
          id={`${props.id}-header`}
          css={`
            background-color: #f7f7f7;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          {props.expanded ? (
            <ExpandLessIcon
              data-cy="expandless-icon"
              css={`
                margin-right: 16px;
              `}
            />
          ) : (
            <ExpandMoreIcon
              data-cy="expandmore-icon"
              css={`
                margin-right: 16px;
              `}
            />
          )}

          <Typography style={ProjectTypography.accordionSummary}>
            {props.label}
          </Typography>
        </MUIAccordionSummary>
        <MUIAccordionDetails
          data-cy="accordion-detail"
          css={`
            background-color: #f7f7f7;
          `}
        >
          {getAccordionContent(props.data, props.dataType)}
        </MUIAccordionDetails>
      </div>
    </React.Fragment>
  );
};
