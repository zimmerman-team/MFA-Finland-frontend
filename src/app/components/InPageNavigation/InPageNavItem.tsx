import React from "react";
import { InpageNavItemModel } from "app/components/InPageNavigation/model";

export const InPageNavItem = (props: InpageNavItemModel) => {
  return (
    <a
      data-cy={`in-page-nav-${props.id}`}
      onClick={props.onClick}
      css={`
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        cursor: pointer;
        user-select: none;

        ${props.disabled
          ? `
          opacity: 0.5;
          pointer-events: none;
        `
          : ""}
      `}
      id={`${props.id}`}
      href={`#${props.path}`}
    >
      <div
        css={`
          width: 25px;
          height: 8px;
          background: #2e4982;
          margin-right: 48px;
          visibility: ${props.active ? "visible" : "hidden"};
        `}
      />

      <div
        css={`
          font-weight: 500;
          font-size: 14px;
          line-height: 24px;
          letter-spacing: 0.100318px;
          transition: all 200ms;
          color: ${props.active ? "#2E4982" : "#626262"};
          &:hover {
            opacity: 0.4;
          }
        `}
      >
        {props.label}
      </div>
    </a>
  );
};
