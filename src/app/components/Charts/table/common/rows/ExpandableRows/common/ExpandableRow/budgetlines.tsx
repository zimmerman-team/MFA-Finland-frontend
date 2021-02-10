/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import get from "lodash/get";
import { formatLocale } from "app/utils/formatLocale";
import { TableRow, TableCell } from "@material-ui/core";
import { ExpandableRows } from "app/components/Charts/table/common/rows/ExpandableRows";
import { ExpandButton } from "app/components/Charts/table/common/rows/ExpandableRows/common/ExpandBtn";

const tableCellColors = [
  "rgba(182, 182, 182, 0)",
  "rgba(182, 182, 182, 0.2)",
  "rgba(182, 182, 182, 0.4)",
  "rgba(182, 182, 182, 0.6)",
];

export const ExpandableRowBudgetLines = (props: any) => {
  const [expanded, setExpanded] = React.useState(false);

  const children = get(props, "child.lines", []);

  return (
    <React.Fragment>
      <TableRow
        onClick={() => {
          if (children.length > 0) {
            setExpanded(!expanded);
          }
        }}
        css={`
          && {
            background-color: ${tableCellColors[props.level]};

            ${children.length > 0
              ? `
                &:hover {
                  cursor: pointer;
                }
              `
              : ""}
          }
        `}
      >
        <TableCell colSpan={1}>
          {children.length > 0 && (
            <ExpandButton
              expanded={expanded}
              onExpand={() => setExpanded(!expanded)}
            />
          )}
        </TableCell>
        <TableCell key={props.child.year} colSpan={1}>
          {props.child.year}
        </TableCell>
        <TableCell key={`${props.child.line}-line`} colSpan={1}>
          {formatLocale(props.child.line)}
        </TableCell>
        <TableCell key={`${props.child.value}-value`} colSpan={1}>
          {formatLocale(props.child.value)}
        </TableCell>
      </TableRow>
      {expanded && children.length > 0 && (
        <ExpandableRows
          data={children}
          type="budgetlines"
          level={props.level + 1}
          key={`${props.child.year}-children`}
        />
      )}
    </React.Fragment>
  );
};
