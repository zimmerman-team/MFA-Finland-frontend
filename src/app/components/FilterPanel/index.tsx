import React from "react";
import { useRecoilState } from "recoil";
import { Container } from "@material-ui/core";
import { createStyles } from "./styles";
import {
  FILTER_TYPES,
  level1MockData,
  level2MockData,
  level3MockData,
} from "./data";
import { currentFilterOpenAtom } from "app/state/recoil/atoms";
import { ChooseAFilterPanel } from "./Panels/ChooseAFilterPanel";
import { Filter } from "./Panels/Filter";

export interface FilterPanelProps {}

export const FilterPanel = (props: FilterPanelProps) => {
  const styles = createStyles(props);
  const [currentFilterOpen, setCurrentFilterOpen] = useRecoilState(
    currentFilterOpenAtom
  );

  React.useEffect(() => {}, []);

  function renderPanel() {
    switch (currentFilterOpen) {
      case FILTER_TYPES.NONE:
        return <></>;
        break;
      case FILTER_TYPES.MAIN:
        return <ChooseAFilterPanel {...props} />;
        break;
      case FILTER_TYPES.THEMATIC_AREAS:
        return <Filter title="Thematic Areas" data={level1MockData} />;
        break;
      case FILTER_TYPES.COUNTRIES:
        return <Filter title="Countries/Regions" data={level1MockData} />;
        break;
      case FILTER_TYPES.SECTORS:
        return <Filter title="Sector" data={level3MockData} />;
        break;
      case FILTER_TYPES.ORGANISATIONS:
        return <Filter title="Organisations" data={level2MockData} />;
        break;
      case FILTER_TYPES.SDGS:
        return <Filter title="SDGs" data={level2MockData} />;
        break;
      case FILTER_TYPES.ACTIVITY_STATUS:
        return <Filter title="Activity Status" data={level1MockData} />;
        break;
      case FILTER_TYPES.PERIOD:
        return <></>;
        break;
      case FILTER_TYPES.ADVANCED_FILTERS:
        return <Filter title="Advanced Filters" data={level1MockData} />;
        break;
      default:
        return <></>;
    }
  }

  return (
    <>
      {currentFilterOpen != FILTER_TYPES.NONE && (
        <div css={styles.container}>
          <Container maxWidth="lg" css={styles.muiContainer}>
            {renderPanel()}
          </Container>
        </div>
      )}
    </>
  );
};
