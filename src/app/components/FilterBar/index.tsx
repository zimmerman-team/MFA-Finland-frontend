import React from "react";
import { useLocation } from "react-router-dom";
import { Hidden, Typography } from "@material-ui/core";

import { getMockData, shouldRender } from "./utils";
import { createStyles } from "./styles";
import { useRecoilState } from "recoil";
import { currentFilterOpenAtom } from "app/state/recoil/atoms";

import { FILTER_TYPES } from "app/components/FilterPanel/data";
import { Chip } from "app/components/FilterBar/common/Chip";
import { PillButton } from "app/components/Buttons/PillButton";

import FilterListIcon from "@material-ui/icons/FilterList";

export interface FilterBarProps {
  show?: boolean;
}

// TODO: FilterBar: display selected filters
export const FilterBar = (props: FilterBarProps) => {
  const mockData = getMockData();
  const location = useLocation();
  const render: boolean = shouldRender(location);
  const [chips, setChips] = React.useState([
    { name: "2020" },
    /*{ name: "2020" },
    { name: "2020" },
    { name: "2020" },
    { name: "2020" },
    { name: "2020" },
    { name: "2020" },
    { name: "2020" },
    { name: "2020" },
    { name: "2020" },
    { name: "2020" },
    { name: "2020" },
    { name: "2020" },
    { name: "2020" },
    { name: "2020" },
    { name: "2020" },
    { name: "2020" },
    { name: "2020" },
    { name: "2020" },
    { name: "2020" },
    { name: "2020" },*/
  ]);
  const [_, setCurrentFilterOpen] = useRecoilState(currentFilterOpenAtom);
  const [height, setHeight] = React.useState(64);
  const styles = createStyles(props, height);
  let container: any;

  React.useEffect(() => {
    setHeight(container ? container.clientHeight : 64);
  }, [chips]);

  if (render) {
    return (
      <>
        <div
          css={styles.container}
          id="filterbar-container"
          ref={(ref) => {
            container = ref;
          }}
        >
          <div css={styles.buttonContainer}>
            <PillButton
              css={styles.button}
              onClick={() => setCurrentFilterOpen(FILTER_TYPES.MAIN)}
            >
              Add Filters
            </PillButton>
            <Typography variant="subtitle2" css={styles.label}>
              Your selections
            </Typography>
          </div>
          <div css={styles.chipContainer}>
            {chips.map((chip, index) => {
              return (
                <Chip
                  key={chip.name}
                  label={chip.name}
                  onDelete={() =>
                    setChips(chips.filter((item) => item.name !== chip.name))
                  }
                />
              );
            })}
          </div>
        </div>
        <div css={styles.background} />
        <Hidden smUp>
          <div
            css={`
              width: 40px;
              height: 40px;
              background-color: #2e4982;
              position: fixed;
              top: 70vh;
              right: 8px;
              z-index: 4;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 50%;
            `}
            onClick={() => setCurrentFilterOpen(FILTER_TYPES.MAIN)}
          >
            <FilterListIcon
              css={`
                fill: white;
              `}
            />
          </div>
        </Hidden>
      </>
    );
  } else {
    return null;
  }
};
