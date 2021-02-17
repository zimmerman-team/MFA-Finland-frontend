import React from "react";
import { ExpandableRow } from "app/components/Charts/table/common/rows/ExpandableRows/common/ExpandableRow";
import { ExpandableRowOrg } from "app/components/Charts/table/common/rows/ExpandableRows/common/ExpandableRow/org";
import { ExpandableRowBudgetLines } from "app/components/Charts/table/common/rows/ExpandableRows/common/ExpandableRow/budgetlines";

export const ExpandableRows = (props: any) => {
  if (props.type === "org" || props.type === "location") {
    return props.data.map((child: any) => (
      <ExpandableRowOrg
        child={child}
        key={child.name}
        level={props.level}
        type={props.type}
      />
    ));
  }
  if (props.type === "budgetlines") {
    return props.data.map((child: any) => (
      <ExpandableRowBudgetLines
        child={child}
        key={child.year}
        level={props.level}
      />
    ));
  }
  return props.data.map((child: any) => (
    <ExpandableRow child={child} key={child.title} level={props.level} />
  ));
};
