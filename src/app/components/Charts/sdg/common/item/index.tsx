/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { selectedFilterAtom } from "app/state/recoil/atoms";
import { SDGvizItemProps } from "app/components/Charts/sdg/data";

interface CompProps extends SDGvizItemProps {
  setHoveredNode: React.Dispatch<React.SetStateAction<SDGvizItemProps | null>>;
}

export function SDGvizItem(props: CompProps) {
  const history = useHistory();
  const [selectedFilters, setSelectedFilters] = useRecoilState(
    selectedFilterAtom
  );

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
      onClick={() => {
        setSelectedFilters({
          ...selectedFilters,
          sdg: [...selectedFilters.sdg, props.number.toString()],
        });
        setTimeout(
          () => history.push(`/viz/projects${history.location.search}`),
          200
        );
      }}
    >
      <img src={props.icon} alt={`${props.number} - ${props.name}`} />
    </div>
  );
}
