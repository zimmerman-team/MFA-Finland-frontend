/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import useFitText from "use-fit-text";
import { PrimaryColor } from "app/theme";
import { css } from "styled-components/macro";
import { formatLargeAmountsWithPrefix } from "app/utils/formatMoneyWithPrefix";

const containercss = css`
  display: flex;
  overflow: hidden;
  position: absolute;
  border-style: none;
  box-sizing: border-box;
  align-items: flex-start;

  &:hover {
    filter: grayscale(100%);
  }

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
      tabIndex={0}
      role="button"
      id={node.id}
      aria-label={node.data.name}
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
        border: "0.5px solid #343249",
        borderRadius: `${node.y === 1 && node.x === 1 ? 10 : 0}px ${
          node.y === 1 && node.x + node.width + 2 > props.containerSize.width
            ? 10
            : 0
        }px ${
          node.x + node.width + 2 > props.containerSize.width &&
          props.containerSize.height === node.y + node.height + 1
            ? 10
            : 0
        }px ${
          props.containerSize.height === node.y + node.height + 1 &&
          node.x === 1
            ? 10
            : 0
        }px`,
      }}
      css={containercss}
      onClick={node.onClick}
      onMouseMove={node.onMouseMove}
      onMouseEnter={node.onMouseEnter}
      onMouseLeave={node.onMouseLeave}
      onKeyPress={node.onClick}
      onFocus={node.onMouseEnter}
    >
      {(node.width > 99 || node.height > 99) && (
        <div>
          <div>{node.data.name}</div>
          <div css="width: 100%;height: 5px;" />
          <div>{formatLargeAmountsWithPrefix(node.data.value)}</div>
        </div>
      )}
    </div>
  );
}
