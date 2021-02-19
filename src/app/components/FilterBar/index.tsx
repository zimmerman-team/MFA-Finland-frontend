import React from "react";
import filter from "lodash/filter";
import { useRecoilState } from "recoil";
import { Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { useStoreState } from "app/state/store/hooks";
import { Chip } from "app/components/FilterBar/common/Chip";
import { createStyles } from "app/components/FilterBar/styles";
import { PillButton } from "app/components/Buttons/PillButton";
import { FILTER_TYPES } from "app/components/FilterPanel/data";
import {
  ChipModel,
  getFilterChips,
  shouldRender,
} from "app/components/FilterBar/utils";
import {
  currentFilterOpenAtom,
  selectedFilterAtom,
} from "app/state/recoil/atoms";

export interface FilterBarProps {
  show?: boolean;
}

// TODO: FilterBar: display selected filters
export const FilterBar = (props: FilterBarProps) => {
  const location = useLocation();
  const [chips, setChips] = React.useState<ChipModel[]>([]);
  const render: boolean = shouldRender(location);
  const [_, setCurrentFilterOpen] = useRecoilState(currentFilterOpenAtom);
  const [selectedFilters, setSelectedFilters] = useRecoilState(
    selectedFilterAtom
  );
  const filterOptionsData = useStoreState((state) => state.filterOptions);
  const [height, setHeight] = React.useState(64);
  const styles = createStyles(props, height);
  let container: any;

  React.useEffect(() => {
    setHeight(container ? container.clientHeight : 64);
  }, [chips]);

  React.useEffect(() => {
    setChips(getFilterChips(selectedFilters, filterOptionsData));
  }, [selectedFilters, filterOptionsData]);

  function removeChip(chip: ChipModel) {
    const updatedSelectedFilters = { ...selectedFilters };
    switch (chip.type) {
      case FILTER_TYPES.THEMATIC_AREAS:
        updatedSelectedFilters.tag = filter(
          updatedSelectedFilters.tag,
          (f: string) => f !== chip.value
        );
        break;
      case FILTER_TYPES.COUNTRIES:
        updatedSelectedFilters.countries = filter(
          updatedSelectedFilters.countries,
          (f: string) => f !== chip.value
        );
        updatedSelectedFilters.regions = filter(
          updatedSelectedFilters.regions,
          (f: string) => f !== chip.value
        );
        break;
      case FILTER_TYPES.SECTORS:
        updatedSelectedFilters.sectors = filter(
          updatedSelectedFilters.sectors,
          (f: string) => f !== chip.value
        );
        break;
      case FILTER_TYPES.ORGANISATIONS:
        updatedSelectedFilters.organisations = filter(
          updatedSelectedFilters.organisations,
          (f: string) => f !== chip.value
        );
        updatedSelectedFilters.organisationtypes = filter(
          updatedSelectedFilters.organisationtypes,
          (f: string) => f !== chip.value
        );
        break;
      case FILTER_TYPES.SDGS:
        updatedSelectedFilters.tag = filter(
          updatedSelectedFilters.tag,
          (f: string) => f !== chip.value
        );
        break;
      case FILTER_TYPES.ACTIVITY_STATUS:
        updatedSelectedFilters.activitystatus = filter(
          updatedSelectedFilters.activitystatus,
          (f: string) => f !== chip.value
        );
        break;
      default:
        break;
    }
    setSelectedFilters(updatedSelectedFilters);
  }

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
            {chips.map((chip: any, index) => {
              return (
                <Chip
                  key={chip.name}
                  label={chip.name}
                  onDelete={() => removeChip(chip)}
                />
              );
            })}
          </div>
        </div>
        <div css={styles.background} />
      </>
    );
  }
  return null;
};
