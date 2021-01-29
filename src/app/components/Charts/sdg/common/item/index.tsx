import React from "react";
import { SDGvizItemProps } from "app/components/Charts/sdg/data";

interface CompProps extends SDGvizItemProps {
  setHoveredNode: React.Dispatch<React.SetStateAction<SDGvizItemProps | null>>;
}

export function SDGvizItem(props: CompProps) {
  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        opacity: ${props.disabled ? 0.1 : 1};
        cursor: ${props.disabled ? "default" : "pointer"};

        > img {
          width: 100%;
          height: 100%;
        }
      `}
      onMouseEnter={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!props.disabled) {
          props.setHoveredNode({
            name: props.name,
            number: props.number,
            icon: props.icon,
            disabled: props.disabled,
            disbursed: props.disbursed,
            committed: props.committed,
          });
        }
      }}
      onMouseLeave={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!props.disabled) {
          props.setHoveredNode(null);
        }
      }}
    >
      <img src={props.icon} alt={`${props.number} - ${props.name}`} />
    </div>
  );
}
