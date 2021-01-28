/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from "react";
import findIndex from "lodash/findIndex";
import { IconChevronR } from "app/assets/icons/IconChevronR";
import {
  containercss,
  disablearrowcss,
} from "app/components/Charts/common/arrowselector/styles";

interface ArrowSelectorProps {
  selected: string;
  options: string[];
  onChange: Function;
}

export function ArrowSelector(props: ArrowSelectorProps) {
  const [selIndex, setSelIndex] = React.useState(0);

  React.useEffect(
    () => setSelIndex(findIndex(props.options, (o) => o === props.selected)),
    [props.selected, props.options]
  );

  function onPrevClick() {
    props.onChange(props.options[selIndex - 1]);
  }

  function onNextClick() {
    props.onChange(props.options[selIndex + 1]);
  }

  return (
    <div css={containercss}>
      <span
        onClick={onPrevClick}
        data-cy="arrow-selector-prev"
        css={selIndex === 0 ? disablearrowcss : ""}
      >
        &#9664;
      </span>
      <div css="padding: 0 8px;" data-cy="arrow-selector-name">
        {props.selected}
      </div>
      <span
        onClick={onNextClick}
        data-cy="arrow-selector-next"
        css={selIndex === props.options.length - 1 ? disablearrowcss : ""}
      >
        &#9654;
      </span>
    </div>
  );
}
