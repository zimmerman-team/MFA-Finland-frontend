import React from "react";
import get from "lodash/get";
import filter from "lodash/filter";
import { useRecoilState } from "recoil";
import { useCMSData } from "app/hooks/useCMSData";
import { Hidden, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { useStoreState } from "app/state/store/hooks";
import { Chip } from "app/components/FilterBar/common/Chip";
import { createStyles } from "app/components/FilterBar/styles";
import { PillButton } from "app/components/Buttons/PillButton";
import { FILTER_TYPES } from "app/components/FilterPanel/data";
import {
  ChipModel,
  getFilterChip,
  shouldRender,
} from "app/components/FilterBar/utils";
import {
  currentFilterOpenAtom,
  selectedFilterAtom,
} from "app/state/recoil/atoms";

import FilterListIcon from "@material-ui/icons/FilterList";

export interface FilterBarProps {
  show?: boolean;
}

export const FilterBar = (props: FilterBarProps) => {
  const location = useLocation();
  const cmsData = useCMSData({ returnData: true });
  const [chips, setChips] = React.useState<ChipModel[]>([]);
  const render: boolean = shouldRender(location);
  const [_, setCurrentFilterOpen] = useRecoilState(currentFilterOpenAtom);
  const [selectedFilters, setSelectedFilters] = useRecoilState(
    selectedFilterAtom
  );
  const filterOptionsData = useStoreState((state) => state.filterOptions);
  const [height, setHeight] = React.useState(68);
  const styles = createStyles(props, height);
  let container: any;
  // React.useEffect(() => {
  //   setHeight(container ? container.clientHeight : 68);
  // }, [chips]);

  React.useEffect(() => {
    setChips(getFilterChip(selectedFilters, filterOptionsData));
  }, [selectedFilters, filterOptionsData]);

  function removeChip(chip: ChipModel) {
    const updatedSelectedFilters = { ...selectedFilters };
    switch (chip.type) {
      case FILTER_TYPES.THEMATIC_AREAS:
        updatedSelectedFilters.tag = filter(
          updatedSelectedFilters.tag,
          (f: string) => {
            if (updatedSelectedFilters.tag.length > 1) {
              return false;
            }
            return f !== chip.values[0].value;
          }
        );
        break;
      case FILTER_TYPES.COUNTRIES:
        updatedSelectedFilters.countries = filter(
          updatedSelectedFilters.countries,
          (f: string) => {
            if (updatedSelectedFilters.countries.length > 1) {
              return false;
            }
            return f !== chip.values[0].value;
          }
        );
        updatedSelectedFilters.regions = filter(
          updatedSelectedFilters.regions,
          (f: string) => {
            if (updatedSelectedFilters.regions.length > 1) {
              return false;
            }
            return f !== chip.values[0].value;
          }
        );
        break;
      case FILTER_TYPES.SECTORS:
        updatedSelectedFilters.sectors = filter(
          updatedSelectedFilters.sectors,
          (f: string) => {
            if (updatedSelectedFilters.sectors.length > 1) {
              return false;
            }
            return f !== chip.values[0].value;
          }
        );
        break;
      case FILTER_TYPES.ORGANISATIONS:
        updatedSelectedFilters.organisations = filter(
          updatedSelectedFilters.organisations,
          (f: string) => {
            if (updatedSelectedFilters.organisations.length > 1) {
              return false;
            }
            return f !== chip.values[0].value;
          }
        );
        updatedSelectedFilters.organisationtypes = filter(
          updatedSelectedFilters.organisationtypes,
          (f: string) => {
            if (updatedSelectedFilters.organisationtypes.length > 1) {
              return false;
            }
            return f !== chip.values[0].value;
          }
        );
        break;
      case FILTER_TYPES.SDGS:
        updatedSelectedFilters.sdg = filter(
          updatedSelectedFilters.sdg,
          (f: string) => {
            if (updatedSelectedFilters.sdg.length > 1) {
              return false;
            }
            return f !== chip.values[0].value;
          }
        );
        break;
      case FILTER_TYPES.ACTIVITY_STATUS:
        updatedSelectedFilters.activitystatus = filter(
          updatedSelectedFilters.activitystatus,
          (f: string) => {
            if (updatedSelectedFilters.activitystatus.length > 1) {
              return false;
            }
            return f !== chip.values[0].value;
          }
        );
        break;
      case FILTER_TYPES.POLICY_MARKERS:
        updatedSelectedFilters.policymarker = filter(
          updatedSelectedFilters.policymarker,
          (f: string) => {
            if (updatedSelectedFilters.policymarker.length > 1) {
              return false;
            }
            return f !== chip.values[0].value;
          }
        );
        break;
      case FILTER_TYPES.AID_TYPE:
        updatedSelectedFilters.defaultaidtype = filter(
          updatedSelectedFilters.defaultaidtype,
          (f: string) => {
            if (updatedSelectedFilters.defaultaidtype.length > 1) {
              return false;
            }
            return f !== chip.values[0].value;
          }
        );
        break;
      case FILTER_TYPES.BUDGET_LINES:
        updatedSelectedFilters.budgetlines = filter(
          updatedSelectedFilters.budgetlines,
          (f: string) => {
            if (updatedSelectedFilters.budgetlines.length > 1) {
              return false;
            }
            return f !== chip.values[0].value;
          }
        );
        break;
      case FILTER_TYPES.BI_MULTI:
        updatedSelectedFilters.collaborationtype = filter(
          updatedSelectedFilters.collaborationtype,
          (f: string) => {
            if (updatedSelectedFilters.collaborationtype.length > 1) {
              return false;
            }
            return f !== chip.values[0].value;
          }
        );
        break;
      case FILTER_TYPES.HUMAN_RIGHTS:
        updatedSelectedFilters.humanrights = filter(
          updatedSelectedFilters.humanrights,
          (f: string) => {
            if (updatedSelectedFilters.humanrights.length > 1) {
              return false;
            }
            return f !== chip.values[0].value;
          }
        );
        break;
      case FILTER_TYPES.PERIOD:
        updatedSelectedFilters.years = [];
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
              {get(cmsData, "filters.addfilters", "Add Filters")}
            </PillButton>
            <Typography variant="subtitle2" css={styles.label}>
              {get(cmsData, "filters.selections", "Your selections")}
            </Typography>
          </div>
          <div css={styles.chipContainer}>
            {chips.map((chip: any, index) => {
              return (
                <Chip
                  type={chip.type}
                  values={chip.values}
                  label={chip.label}
                  onDelete={() => removeChip(chip)}
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
  }
  return null;
};
