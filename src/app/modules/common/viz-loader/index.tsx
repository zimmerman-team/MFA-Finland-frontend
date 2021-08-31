import React from "react";

interface Props {
  loading: boolean;
}

export function VizLoader(props: Props) {
  console.log("test");
  return (
    <div
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
