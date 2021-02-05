import React from "react";
import get from "lodash/get";
import isEqual from "lodash/isEqual";
import { useRecoilState } from "recoil";
import { useMount, useUnmount } from "react-use";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import {
  selectedFilterAtom,
  ODAlatestFiltersAtom,
  ThematicAreasLatestFiltersAtom,
  SectorsSunburstLatestFiltersAtom,
  LocationsTreemapLatestFiltersAtom,
  OrganisationsLatestFiltersAtom,
  BudgetLinesLatestFiltersAtom,
  SDGlatestFiltersAtom,
  GeoLatestFiltersAtom,
} from "app/state/recoil/atoms";

export function useDataGridData() {
  const [selectedFilters] = useRecoilState(selectedFilterAtom);
  const [ODAlatestFilters, setODAlatestFilters] = useRecoilState(
    ODAlatestFiltersAtom
  );
  const [
    ThematicAreasLatestFilters,
    setThematicAreasLatestFilters,
  ] = useRecoilState(ThematicAreasLatestFiltersAtom);
  const [
    SectorsSunburstLatestFilters,
    setSectorsSunburstLatestFilters,
  ] = useRecoilState(SectorsSunburstLatestFiltersAtom);
  const [
    LocationsTreemapLatestFilters,
    setLocationsTreemapLatestFilters,
  ] = useRecoilState(LocationsTreemapLatestFiltersAtom);
  const [
    OrganisationsLatestFilters,
    setOrganisationsLatestFilters,
  ] = useRecoilState(OrganisationsLatestFiltersAtom);
  const [
    BudgetLinesLatestFilters,
    setBudgetLinesLatestFilters,
  ] = useRecoilState(BudgetLinesLatestFiltersAtom);
  const [SDGlatestFilters, setSDGlatestFilters] = useRecoilState(
    SDGlatestFiltersAtom
  );
  const [GeoLatestFilters, setGeoLatestFilters] = useRecoilState(
    GeoLatestFiltersAtom
  );

  /* STATE & ACTIONS */
  const odaBarChartAction = useStoreActions(
    (actions) => actions.odaBarChart.fetch
  );
  const odaBarChartData = useStoreState((state) =>
    get(state.odaBarChart, "data.vizData", [])
  );
  const thematicAreasChartAction = useStoreActions(
    (actions) => actions.thematicAreasChart.fetch
  );
  const thematicAreasChartData = useStoreState((state) =>
    get(state.thematicAreasChart, "data.vizData", [])
  );
  const sectorsSunburstAction = useStoreActions(
    (actions) => actions.sectorsSunburst.fetch
  );
  const sectorsSunburstDataCount = useStoreState((state) =>
    get(state.sectorsSunburst, "data.count", 0)
  );
  const sectorsSunburstData = useStoreState((state) =>
    get(state.sectorsSunburst, "data.vizData", { children: [] })
  );
  const locationsTreemapAction = useStoreActions(
    (actions) => actions.locationsTreemap.fetch
  );
  const locationsTreemapData = useStoreState((state) =>
    get(state.locationsTreemap, "data.vizData", {
      name: "",
      color: "",
      children: [],
    })
  );
  const organisationsTreemapAction = useStoreActions(
    (actions) => actions.organisationsTreemap.fetch
  );
  const organisationsTreemapData = useStoreState((state) =>
    get(state.organisationsTreemap, "data.vizData", {
      name: "",
      color: "",
      children: [],
    })
  );
  const budgetLinesBarChartAction = useStoreActions(
    (actions) => actions.budgetLinesBarChart.fetch
  );
  const budgetLinesBarChartData = useStoreState((state) =>
    get(state.budgetLinesBarChart, "data.vizData", [])
  );
  const sdgVizAction = useStoreActions((actions) => actions.sdgViz.fetch);
  const sdgVizData = useStoreState((state) =>
    get(state.sdgViz, "data.vizData", [])
  );
  const geoMapAction = useStoreActions((actions) => actions.geoMap.fetch);
  const geoMapData = useStoreState((state) =>
    get(state.geoMap, "data.vizData", [])
  );

  useMount(() => {
    const filters = getAPIFormattedFilters(selectedFilters);
    if (
      odaBarChartData.length === 0 ||
      !isEqual(ODAlatestFilters, selectedFilters)
    ) {
      odaBarChartAction({
        values: {
          filters,
        },
      });
    }
    if (
      thematicAreasChartData.length === 0 ||
      !isEqual(ThematicAreasLatestFilters, selectedFilters)
    ) {
      thematicAreasChartAction({
        values: {
          filters,
        },
      });
    }
    if (
      sectorsSunburstData.children.length === 0 ||
      !isEqual(SectorsSunburstLatestFilters, selectedFilters)
    ) {
      sectorsSunburstAction({
        values: {
          filters,
        },
      });
    }
    if (
      locationsTreemapData.children.length === 0 ||
      !isEqual(LocationsTreemapLatestFilters, selectedFilters)
    ) {
      locationsTreemapAction({
        values: {
          filters,
        },
      });
    }
    if (
      organisationsTreemapData.children.length === 0 ||
      !isEqual(OrganisationsLatestFilters, selectedFilters)
    ) {
      organisationsTreemapAction({
        values: {
          filters,
        },
      });
    }
    if (
      budgetLinesBarChartData.length === 0 ||
      !isEqual(BudgetLinesLatestFilters, selectedFilters)
    ) {
      budgetLinesBarChartAction({
        values: {
          filters,
        },
      });
    }
    if (
      sdgVizData.length === 0 ||
      !isEqual(SDGlatestFilters, selectedFilters)
    ) {
      sdgVizAction({
        values: {
          filters,
        },
      });
    }
    if (
      geoMapData.length === 0 ||
      !isEqual(GeoLatestFilters, selectedFilters)
    ) {
      geoMapAction({
        values: {
          filters,
        },
      });
    }
  });

  useUnmount(() => {
    setODAlatestFilters(selectedFilters);
    setThematicAreasLatestFilters(selectedFilters);
    setSectorsSunburstLatestFilters(selectedFilters);
    setLocationsTreemapLatestFilters(selectedFilters);
    setOrganisationsLatestFilters(selectedFilters);
    setBudgetLinesLatestFilters(selectedFilters);
    setSDGlatestFilters(selectedFilters);
    setGeoLatestFilters(selectedFilters);
  });

  return {
    odaBarChartData,
    thematicAreasChartData,
    sectorsSunburstDataCount,
    sectorsSunburstData,
    locationsTreemapData,
    organisationsTreemapData,
    budgetLinesBarChartData,
    sdgVizData,
    geoMapData,
  };
}
