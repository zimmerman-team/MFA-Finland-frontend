import React from "react";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

export function ExpandButton(props: any) {
  return (
    <React.Fragment>
      {props.expanded ? (
        <IconButton
          onClick={props.onExpand}
          style={{ padding: 0 }}
          aria-label="expand"
        >
          <KeyboardArrowDown id="expandable-button-down" />
        </IconButton>
      ) : (
        <IconButton
          onClick={props.onExpand}
          style={{ padding: 0 }}
          aria-label="de-expand"
        >
          <KeyboardArrowRight id="expandable-button-right" />
        </IconButton>
      )}
    </React.Fragment>
  );
}
