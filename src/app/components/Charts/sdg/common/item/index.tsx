/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { languageAtom, selectedFilterAtom } from "app/state/recoil/atoms";
import { SDGvizItemProps } from "app/components/Charts/sdg/data";
import { getName } from "app/components/Charts/sdg/index";

interface CompProps extends SDGvizItemProps {
  setHoveredNode: React.Dispatch<React.SetStateAction<SDGvizItemProps | null>>;
}

export function SDGvizItem(props: CompProps) {
  const history = useHistory();
  const [selectedFilters, setSelectedFilters] = useRecoilState(
    selectedFilterAtom
  );
  const [currentLanguage] = useRecoilState(languageAtom);

  function getIcon() {
    if (currentLanguage === "se") return "icon_se";
    if (currentLanguage === "fi") return "icon_fi";
    if (currentLanguage === "en") return "icon";
    return "icon";
  }

  function handleMouseEnter() {
    if (!props.disabled) {
      props.setHoveredNode({
        name: props.name,
        name_fi: props.name_fi,
        name_se: props.name_se,
        number: props.number,
        icon: props.icon,
        icon_fi: props.icon_fi,
        icon_se: props.icon_se,
        disabled: props.disabled,
        disbursed: props.disbursed,
        committed: props.committed,
      });
    }
  }

  return (
    <button
      aria-label={`SDG: ${props.number} - ${props.name}`}
      css={`
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        width: 100%;
        height: 100%;
        opacity: ${props.disabled ? 0.1 : 1};
        cursor: ${props.disabled ? "default" : "pointer"};
        :hover {
          cursor: ${props.disabled ? "default" : "pointer"};
        }

        > img {
          width: 100%;
          height: 100%;
        }
        :focus {
          outline: 2px solid rgba(0, 0, 0, 0.1);
        }
      `}
      onMouseEnter={(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
      ) => {
        handleMouseEnter();
      }}
      onFocus={() => handleMouseEnter()}
      onMouseLeave={(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
      ) => {
        if (!props.disabled) {
          props.setHoveredNode(null);
        }
      }}
      onClick={() => {
        if (!props.disabled) {
          setSelectedFilters({
            ...selectedFilters,
            sdg: [...selectedFilters.sdg, props.number.toString()],
          });
          setTimeout(
            () =>
              history.push(
                `/${currentLanguage}/viz/projects${history.location.search}`
              ),
            200
          );
        }
      }}
    >
      <img
        src={props[getIcon()]}
        // @ts-ignore
        alt={`${props.number} - ${props[getName(currentLanguage)]}`}
      />
    </button>
  );
}
