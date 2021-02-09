import React from "react";
import { Paper } from "@material-ui/core";
import { css } from "styled-components/macro";

interface MultiValuesCellModuleModel {
  value: string[];
  colSpan?: number;
}

const papercss = css`
  z-index: 10;
  width: 150px;
  margin-top: 5px;
  position: absolute;
`;

const listcss = css`
  list-style-type: none;
  padding-inline-start: 23px;
`;

export const MultiValuesCell = (props: MultiValuesCellModuleModel) => {
  const [showMore, setShowMore] = React.useState(false);
  const hasMore = props.value.length > 1;
  return (
    <>
      <div
        onMouseEnter={() => setShowMore(true)}
        onMouseLeave={() => setShowMore(false)}
      >
        {props.value[0]}
        {`${hasMore ? ` +${props.value.length - 1} more` : ""}`}
        {showMore && hasMore && (
          <Paper css={papercss}>
            <ul css={listcss}>
              {props.value.map((item: string) => (
                <li key={`multi-value-list-${item}`}>{item}</li>
              ))}
            </ul>
          </Paper>
        )}
      </div>
    </>
  );
};
