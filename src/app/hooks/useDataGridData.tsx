/* eslint-disable no-nested-ternary */
import React from "react";
import get from "lodash/get";
import isEqual from "lodash/isEqual";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { useUpdateEffect, useUnmount } from "react-use";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import {
  selectedFilterAtom,
  prevLocationAtom,
  ODAlatestFiltersAtom,
  ThematicAreasLatestFiltersAtom,
  SectorsSunburstLatestFiltersAtom,
  LocationsTreemapLatestFiltersAtom,
  OrganisationsLatestFiltersAtom,
  BudgetLinesLatestFiltersAtom,
  SDGlatestFiltersAtom,
  GeoLatestFiltersAtom,
} from "app/state/recoil/atoms";

interface useDataGridDataProps {
  detailPageFilter: {
    key: string;
    value: string | string[];
  };
}

export function useDataGridData(props: useDataGridDataProps) {
  const history = useHistory();
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
  const [prevLocation, setPrevLocation] = useRecoilState(prevLocationAtom);

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
  const detailPageNameAction = useStoreActions(
    (actions) => actions.detailPageName.fetch
  );
  const detailPageNameData = useStoreState((state) =>
    get(state.detailPageName.data, "data[0]", "")
  );
  const countryData = useStoreState((state) => ({
    region: get(state.detailPageName.data, "data.region", ""),
    isPartner: get(state.detailPageName.data, "data.isPartner", ""),
    countryIndicators: get(state.detailPageName.data, "data.indicators", []),
  }));
  const sectorDescription = useStoreState((state) =>
    get(state.detailPageName.data, "data[1]", "")
  );
  const geoMapAction = useStoreActions((actions) => actions.geoMap.fetch);
  const geoMapData = useStoreState((state) =>
    get(state.geoMap, "data.vizData", [])
  );
  const unallocablePercentage = useStoreState((state) =>
    get(state.geoMap, "data.unallocablePercentage", 0)
  );
  const vizDataLoading = useStoreState((state) => ({
    oda: state.odaBarChart.loading,
    thematic: state.thematicAreasChart.loading,
    sectors: state.sectorsSunburst.loading,
    locations: state.locationsTreemap.loading,
    organisations: state.organisationsTreemap.loading,
    budgetLines: state.budgetLinesBarChart.loading,
    sdg: state.sdgViz.loading,
    geo: state.geoMap.loading,
  }));

  function initialCheckURLSearchParams() {
    const updatedSelectedFilters = { ...selectedFilters };
    const currentUrlParams = new URLSearchParams(history.location.search);
    const countries = currentUrlParams.get("recipient_country_code");
    const regions = currentUrlParams.get("recipient_region_code");
    const sectors = currentUrlParams.get("sector_code");
    const organisations = currentUrlParams.get("participating_org_ref");
    const activitystatus = currentUrlParams.get("activity_status_code");
    const activityscope = currentUrlParams.get("activity_scope_code");
    const tag = currentUrlParams.get("tag_narrative");
    const sdg = currentUrlParams.get("tag_code");
    const defaultaidtype = currentUrlParams.get("default_aid_type_code");
    const defaulttiedstatus = currentUrlParams.get("default_tied_status_code");
    const defaultflowtype = currentUrlParams.get("default_flow_type_code");
    const collaborationtype = currentUrlParams.get("collaboration_type_code");
    const policymarker = currentUrlParams.get("policy_marker_code");
    const budgetlines = currentUrlParams.get("budget_line");
    const humanrights = currentUrlParams.get("human_rights_approach");
    const years = currentUrlParams.get("years");

    if (countries) {
      updatedSelectedFilters.countries = countries.split(",");
    }
    if (regions) {
      updatedSelectedFilters.regions = regions.split(",");
    }
    if (sectors) {
      updatedSelectedFilters.sectors = sectors.split(",");
    }
    if (organisations) {
      updatedSelectedFilters.organisations = organisations.split(",");
    }
    if (activitystatus) {
      updatedSelectedFilters.activitystatus = activitystatus.split(",");
    }
    if (activityscope) {
      updatedSelectedFilters.activityscope = activityscope.split(",");
    }
    if (tag) {
      updatedSelectedFilters.tag = tag.split(",");
    }
    if (sdg) {
      updatedSelectedFilters.sdg = sdg.split(",");
    }
    if (defaultaidtype) {
      updatedSelectedFilters.defaultaidtype = defaultaidtype.split(",");
    }
    if (defaultflowtype) {
      updatedSelectedFilters.defaultflowtype = defaultflowtype.split(",");
    }
    if (defaulttiedstatus) {
      updatedSelectedFilters.defaulttiedstatus = defaulttiedstatus.split(",");
    }
    if (collaborationtype) {
      updatedSelectedFilters.collaborationtype = collaborationtype.split(",");
    }
    if (policymarker) {
      updatedSelectedFilters.policymarker = policymarker.split(",");
    }
    if (budgetlines) {
      updatedSelectedFilters.budgetlines = budgetlines.split(",");
    }
    if (humanrights) {
      updatedSelectedFilters.humanrights = humanrights.split(",");
    }
    if (years) {
      updatedSelectedFilters.years = years.split(",");
    }

    return updatedSelectedFilters;
  }

  function reloadData() {
    const pageDetailFilterUpdated =
      typeof props.detailPageFilter.value === "object"
        ? props.detailPageFilter.value.length > 0
        : true;
    let filters = getAPIFormattedFilters(
      selectedFilters,
      initialCheckURLSearchParams
    );
    const isDetailPage = props.detailPageFilter.value !== "";
    if (isDetailPage) {
      filters = {
        ...filters,
        [props.detailPageFilter.key]:
          props.detailPageFilter.key === "tag_narrative"
            ? [
                props.detailPageFilter.value,
                (props.detailPageFilter.value as string).replace(
                  "primary",
                  "secondary"
                ),
              ]
            : typeof props.detailPageFilter.value === "string"
            ? [props.detailPageFilter.value]
            : props.detailPageFilter.value,
      };
      if (pageDetailFilterUpdated) {
        detailPageNameAction({
          values: {
            filters,
            detail_type: props.detailPageFilter.key,
          },
        });
      }
    }
    if (
      (odaBarChartData.length === 0 ||
        !isEqual(ODAlatestFilters, selectedFilters) ||
        isDetailPage ||
        (!isDetailPage && prevLocation !== "")) &&
      !vizDataLoading.oda &&
      pageDetailFilterUpdated
    ) {
      odaBarChartAction({
        values: {
          filters,
        },
      });
    }
    if (
      (thematicAreasChartData.length === 0 ||
        !isEqual(ThematicAreasLatestFilters, selectedFilters) ||
        isDetailPage ||
        (!isDetailPage && prevLocation !== "")) &&
      !vizDataLoading.thematic &&
      pageDetailFilterUpdated
    ) {
      thematicAreasChartAction({
        values: {
          filters,
        },
      });
    }
    if (
      (sectorsSunburstData.children.length === 0 ||
        !isEqual(SectorsSunburstLatestFilters, selectedFilters) ||
        isDetailPage ||
        (!isDetailPage && prevLocation !== "")) &&
      !vizDataLoading.sectors &&
      pageDetailFilterUpdated
    ) {
      sectorsSunburstAction({
        values: {
          filters,
        },
      });
    }
    if (
      (locationsTreemapData.children.length === 0 ||
        !isEqual(LocationsTreemapLatestFilters, selectedFilters) ||
        isDetailPage ||
        (!isDetailPage && prevLocation !== "")) &&
      !vizDataLoading.locations &&
      pageDetailFilterUpdated
    ) {
      locationsTreemapAction({
        values: {
          filters,
        },
      });
    }
    if (
      (organisationsTreemapData.children.length === 0 ||
        !isEqual(OrganisationsLatestFilters, selectedFilters) ||
        isDetailPage ||
        (!isDetailPage && prevLocation !== "")) &&
      !vizDataLoading.organisations &&
      pageDetailFilterUpdated
    ) {
      organisationsTreemapAction({
        values: {
          filters,
        },
      });
    }
    if (
      (budgetLinesBarChartData.length === 0 ||
        !isEqual(BudgetLinesLatestFilters, selectedFilters) ||
        isDetailPage ||
        (!isDetailPage && prevLocation !== "")) &&
      !vizDataLoading.budgetLines &&
      pageDetailFilterUpdated
    ) {
      budgetLinesBarChartAction({
        values: {
          filters,
        },
      });
    }
    if (
      (sdgVizData.length === 0 ||
        !isEqual(SDGlatestFilters, selectedFilters) ||
        isDetailPage ||
        (!isDetailPage && prevLocation !== "")) &&
      !vizDataLoading.sdg &&
      pageDetailFilterUpdated
    ) {
      sdgVizAction({
        values: {
          filters,
        },
      });
    }
    if (
      (geoMapData.length === 0 ||
        !isEqual(GeoLatestFilters, selectedFilters) ||
        isDetailPage ||
        (!isDetailPage && prevLocation !== "")) &&
      !vizDataLoading.geo &&
      pageDetailFilterUpdated
    ) {
      geoMapAction({
        values: {
          filters,
        },
      });
    }
  }

  React.useEffect(() => {
    reloadData();
  }, [prevLocation, props.detailPageFilter.value]);

  useUpdateEffect(() => {
    let filters = getAPIFormattedFilters(selectedFilters);
    const isDetailPage = props.detailPageFilter.value !== "";
    if (isDetailPage) {
      filters = {
        ...filters,
        [props.detailPageFilter.key]:
          props.detailPageFilter.key === "tag_narrative"
            ? [
                props.detailPageFilter.value,
                (props.detailPageFilter.value as string).replace(
                  "primary",
                  "secondary"
                ),
              ]
            : typeof props.detailPageFilter.value === "string"
            ? [props.detailPageFilter.value]
            : props.detailPageFilter.value,
      };
      detailPageNameAction({
        values: {
          filters,
          detail_type: props.detailPageFilter.key,
        },
      });
    }
    if (!vizDataLoading.oda) {
      odaBarChartAction({
        values: {
          filters,
        },
      });
    }
    if (!vizDataLoading.thematic) {
      thematicAreasChartAction({
        values: {
          filters,
        },
      });
    }
    if (!vizDataLoading.sectors) {
      sectorsSunburstAction({
        values: {
          filters,
        },
      });
    }
    if (!vizDataLoading.locations) {
      locationsTreemapAction({
        values: {
          filters,
        },
      });
    }
    if (!vizDataLoading.organisations) {
      organisationsTreemapAction({
        values: {
          filters,
        },
      });
    }
    if (!vizDataLoading.budgetLines) {
      budgetLinesBarChartAction({
        values: {
          filters,
        },
      });
    }
    if (!vizDataLoading.sdg) {
      sdgVizAction({
        values: {
          filters,
        },
      });
    }
    if (!vizDataLoading.geo) {
      geoMapAction({
        values: {
          filters,
        },
      });
    }
  }, [selectedFilters]);

  useUnmount(() => {
    setODAlatestFilters(selectedFilters);
    setPrevLocation(props.detailPageFilter.key);
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
    vizDataLoading,
    unallocablePercentage,
    countryData,
    detailPageNameData,
    sectorDescription,
  };
}
