/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import useFitText from "use-fit-text";
import { css } from "styled-components/macro";
import { PrimaryColor } from "app/theme";
import { formatLocale } from "app/utils/formatLocale";

const containercss = css`
  display: flex;
  overflow: hidden;
  position: absolute;
  border-style: none;
  box-sizing: border-box;
  align-items: flex-start;

  > div {
    width: 100%;
    padding: 15px;
  }
`;

export function TreeemapNode(props: any) {
  const { node } = props;
  const { fontSize, ref } = useFitText({ logLevel: "none" });
  return (
    <div
      id={node.id}
      ref={ref}
      style={{
        fontSize,
        top: node.y,
        left: node.x,
        width: node.width,
        height: node.height,
        color: PrimaryColor[0],
        background: node.data.color,
        cursor: node.data.orgs ? "pointer" : "default",
      }}
      css={containercss}
      onClick={node.onClick}
      onMouseMove={node.onMouseMove}
      onMouseEnter={node.onMouseEnter}
      onMouseLeave={node.onMouseLeave}
    >
      {(node.width > 99 || node.height > 99) && (
        <div>
          <div>{node.data.name}</div>
          <div css="width: 100%;height: 5px;" />
          <div>{formatLocale(node.data.value)}</div>
        </div>
      )}
    </div>
  );
}
