import React from "react";
import { useLocation } from "react-router-dom";
import { Chip as MUIChip, ChipProps, Typography } from "@material-ui/core";
import { PillButton } from "../Buttons/PillButton";
import { shouldRender } from "./utils";
import { createStyles } from "./styles";
import { useRecoilState } from "recoil";
import { currentFilterOpenAtom } from "app/state/recoil/atoms";
import { FILTER_TYPES } from "../FilterPanel/data";
import { Chip } from "./common/Chip";

export interface FilterBarProps {
  show?: boolean;
}

export const FilterBar = (props: FilterBarProps) => {
  const location = useLocation();
  const render: boolean = shouldRender(location);
  const styles = createStyles(props);
  const [chips, setChips] = React.useState([{ name: "2020" }]);
  const [_, setCurrentFilterOpen] = useRecoilState(currentFilterOpenAtom);

  if (render) {
    return (
      <React.Fragment>
        <div css={styles.container}>
          <PillButton
            css={styles.button}
            onClick={() => setCurrentFilterOpen(FILTER_TYPES.MAIN)}
          >
            Add Filters
          </PillButton>
          <Typography variant="subtitle2" css={styles.label}>
            Your selections
          </Typography>
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
        <div css={styles.background} />
      </React.Fragment>
    );
  } else {
    return null;
  }
};
