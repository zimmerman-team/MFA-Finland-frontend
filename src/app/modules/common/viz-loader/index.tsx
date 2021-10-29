import React from "react";

interface Props {
  dataCy: string;
  loading: boolean;
}

export function VizLoader(props: Props) {
  return (
    <div
      data-cy={props.dataCy}
      css={`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      `}
    >
      {props.loading ? <div>Loading...</div> : <div>No data available</div>}
    </div>
  );
}
