/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import get from "lodash/get";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { formatLocale } from "app/utils/formatLocale";
import { TableRow, TableCell } from "@material-ui/core";
import { selectedFilterAtom } from "app/state/recoil/atoms";
import { ExpandableRows } from "app/components/Charts/table/common/rows/ExpandableRows";
import { ExpandButton } from "app/components/Charts/table/common/rows/ExpandableRows/common/ExpandBtn";

const tableCellColors = [
  "rgba(182, 182, 182, 0)",
  "rgba(182, 182, 182, 0.2)",
  "rgba(182, 182, 182, 0.4)",
  "rgba(182, 182, 182, 0.6)",
];

export const ExpandableRowOrg = (props: any) => {
  const history = useHistory();
  const [selectedFilters, setSelectedFilters] = useRecoilState(
    selectedFilterAtom
  );
  const [expanded, setExpanded] = React.useState(false);

  function onLinkClick(code: string) {
    setSelectedFilters({
      ...selectedFilters,
      sectors: [...selectedFilters.sectors, code],
    });
    setTimeout(() => {
      history.push(
        `${history.location.pathname.replace("organisation", "projects")}${
          history.location.search
        }`
      );
    }, 100);
  }

  const children = get(props, "child.orgs", []);

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
        <TableCell key={props.child.name} colSpan={1}>
          <span
            css="color: #2e4982;cursor: pointer;"
            onClick={() => onLinkClick(props.child.name)}
          >
            {props.child.name}
          </span>
        </TableCell>
        <TableCell key={`${props.child.name}-value`} colSpan={1}>
          {formatLocale(props.child.value)}
        </TableCell>
        <TableCell key={`${props.child.name}-committed`} colSpan={1}>
          {formatLocale(props.child.committed)}
        </TableCell>
      </TableRow>
      {expanded && children.length > 0 && (
        <ExpandableRows
          data={children}
          type="org"
          level={props.level + 1}
          key={`${props.child.title}-children`}
        />
      )}
    </React.Fragment>
  );
};
