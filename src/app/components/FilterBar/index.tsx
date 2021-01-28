import React from "react";
import { useLocation } from "react-router-dom";
import { css } from "styled-components/macro";
import { Chip as MUIChip, ChipProps, Typography } from "@material-ui/core";
import { PillButton } from "../Buttons/PillButton";
import { shouldRender } from "./utils";
import { createStyles } from "./styles";
import { ProjectPalette } from "app/theme";
import { useRecoilState } from "recoil";
import { filterPanelOpenAtom } from "app/state/recoil/atoms";

export interface FilterBarProps {
  show?: boolean;
}
const testData = [
  { name: "2020" },
  { name: "I'm a very long name" },
  { name: "2021" },
  { name: "COVID-19" },
  { name: "2020" },
  { name: "I'm a very long name" },
  { name: "2021" },
  { name: "COVID-19" },
  { name: "I'm a very long name" },
  { name: "2021" },
  { name: "COVID-19" },
];

export const FilterBar = (props: FilterBarProps) => {
  const location = useLocation();
  const render: boolean = shouldRender(location);
  const styles = createStyles(props);
  const [chips, setChips] = React.useState([{ name: "2020" }]);
  const [filterPanelOpen, setFilterPanelOpen] = useRecoilState(
    filterPanelOpenAtom
  );

  if (render) {
    return (
      <React.Fragment>
        <div css={styles.container}>
          <PillButton
            css={styles.button}
            onClick={() => setFilterPanelOpen(true)}
          >
            Add Filters
          </PillButton>
          <Typography variant="subtitle2" css={styles.label}>
            Your selections
          </Typography>
          {chips.map((chip, index) => {
            return (
              <Chip
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

interface ChipModel extends ChipProps {}

const chip = css`
  background-color: #fff;
  font-family: Finlandica;
  font-weight: bold;
  color: ${ProjectPalette.primary.main};
  margin-right: 8px;

  .MuiChip-deleteIcon {
    color: #bcc6d6;
  }
`;

export const Chip = (props: ChipModel) => {
  return <MUIChip css={chip} {...props} />;
};
