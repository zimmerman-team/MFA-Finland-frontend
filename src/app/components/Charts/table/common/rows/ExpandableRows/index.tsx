import React from "react";
import { ExpandableRow } from "app/components/Charts/table/common/rows/ExpandableRows/common/ExpandableRow";

export const ExpandableRows = (props: any) => {
  return props.data.map((child: any) => (
    <ExpandableRow key={child.title} child={child} level={props.level} />
  ));
};
