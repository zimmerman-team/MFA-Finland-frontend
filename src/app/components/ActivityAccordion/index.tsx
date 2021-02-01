import React from "react";
import { Typography } from "@material-ui/core";
import MUIAccordionSummary from "@material-ui/core/AccordionSummary";
import MUIAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ProjectTypography } from "app/theme";

import { Anchor } from "app/components/InPageNavigation";
import { ActivityItemProps } from "app/components/ActivityAccordion/model";
import { getAccordionContent } from "app/components/utils/getAccordionContent";
import { AccordionStyle } from "app/components/Accordion/style";

export const ActivityAccordion = (props: ActivityItemProps) => {
  return (
    <React.Fragment>
      <Anchor id={props.id} positionRelativeToTop={64} />

      <div css={AccordionStyle(props.expanded)}>
        <MUIAccordionSummary
          onClick={() =>
            props.handleClick &&
            props.handleClick(props.expanded ? -1 : props.index)
          }
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${props.id}-content`}
          id={`${props.id}-header`}
        >
          <Typography style={ProjectTypography.accordionSummary}>
            {props.label}
          </Typography>
        </MUIAccordionSummary>
        <MUIAccordionDetails>
          {getAccordionContent(props.data, props.dataType)}
        </MUIAccordionDetails>
      </div>
    </React.Fragment>
  );
};
