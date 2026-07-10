/* eslint-disable no-nested-ternary */
import React from "react";
import get from "lodash/get";
import isEqual from "lodash/isEqual";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { getName } from "app/components/Charts/sdg";
import { useUpdateEffect, useUnmount } from "react-use";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
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
  languageAtom,
} from "app/state/recoil/atoms";
import {
  AF_COUNTRY,
  AF_REGION,
  AF_SECTOR,
  AF_PARTICIPATING_ORG_REF,
  AF_ACTIVITY_STATUS_CODE,
  AF_ACTIVITY_SCOPE_CODE,
  AF_TAG_NARRATIVE,
  AF_TAG_CODE,
  AF_DEFAULT_AID_TYPE_CODE,
  AF_DEFAULT_TIED_STATUS_CODE,
  AF_DEFAULT_FLOW_TYPE_CODE,
  AF_COLLABORATION_TYPE_CODE,
  AF_POLICY_MARKER_CODE,
  getAPIFormattedFilters,
} from "app/utils/getAPIFormattedFilters";

interface useDataGridDataProps {
  detailPageFilter: {
    key: string;
    value: string | string[];
  };
}

export function useDataGridData(props: useDataGridDataProps) {
  const history = useHistory();
  const [currentLanguage] = useRecoilState(languageAtom);
  const [selectedFilters] = useRecoilState(selectedFilterAtom);
  const [ODAlatestFilters, setODAlatestFilters] =
    useRecoilState(ODAlatestFiltersAtom);
  const [ThematicAreasLatestFilters, setThematicAreasLatestFilters] =
    useRecoilState(ThematicAreasLatestFiltersAtom);
  const [SectorsSunburstLatestFilters, setSectorsSunburstLatestFilters] =
    useRecoilState(SectorsSunburstLatestFiltersAtom);
  const [LocationsTreemapLatestFilters, setLocationsTreemapLatestFilters] =
    useRecoilState(LocationsTreemapLatestFiltersAtom);
  const [OrganisationsLatestFilters, setOrganisationsLatestFilters] =
    useRecoilState(OrganisationsLatestFiltersAtom);
  const [BudgetLinesLatestFilters, setBudgetLinesLatestFilters] =
    useRecoilState(BudgetLinesLatestFiltersAtom);
  const [SDGlatestFilters, setSDGlatestFilters] =
    useRecoilState(SDGlatestFiltersAtom);
  const [GeoLatestFilters, setGeoLatestFilters] =
    useRecoilState(GeoLatestFiltersAtom);
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
    name: get(
      state.detailPageName.data,
      `data[${getName(currentLanguage)}]`,
      ""
    ),
    region: get(state.detailPageName.data, "data.region", ""),
    isPartner: get(state.detailPageName.data, "data.isPartner", ""),
    countryIndicators: get(state.detailPageName.data, "data.indicators", []),
    news: get(state.detailPageName.data, "data.news", []),
    contact: get(state.detailPageName.data, "data.contact", {
      title: "",
      link: "",
      embassy: {
        title: "",
        link: "",
      },
    }),
  }));
  const sectorNames = useStoreState((state) =>
    get(state.detailPageName.data, "data.names", "")
  );
  const sectorDescription = useStoreState((state) =>
    get(state.detailPageName.data, "data.description", "")
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
    const currentURLParams = new URLSearchParams(history.location.search);
    const countries = currentURLParams.get(AF_COUNTRY);
    const regions = currentURLParams.get(AF_REGION);
    const sectors = currentURLParams.get(AF_SECTOR);
    const organisations = currentURLParams.get(AF_PARTICIPATING_ORG_REF);
    const activitystatus = currentURLParams.get(AF_ACTIVITY_STATUS_CODE);
    const activityscope = currentURLParams.get(AF_ACTIVITY_SCOPE_CODE);
    const tag = currentURLParams.get(AF_TAG_NARRATIVE);
    const sdg = currentURLParams.get(AF_TAG_CODE);
    const defaultaidtype = currentURLParams.get(AF_DEFAULT_AID_TYPE_CODE);
    const defaulttiedstatus = currentURLParams.get(AF_DEFAULT_TIED_STATUS_CODE);
    const defaultflowtype = currentURLParams.get(AF_DEFAULT_FLOW_TYPE_CODE);
    const collaborationtype = currentURLParams.get(AF_COLLABORATION_TYPE_CODE);
    const policymarker = currentURLParams.get(AF_POLICY_MARKER_CODE);
    const budgetlines = currentURLParams.get("budget_line");
    const humanrights = currentURLParams.get("human_rights_approach");
    const years = currentURLParams.get("years");

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
          props.detailPageFilter.key === AF_TAG_NARRATIVE
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
            lang: currentLanguage,
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
          props.detailPageFilter.key === AF_TAG_NARRATIVE
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
          lang: currentLanguage,
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

  useUpdateEffect(() => {
    let filters = getAPIFormattedFilters(selectedFilters);
    const isDetailPage = props.detailPageFilter.value !== "";
    if (isDetailPage) {
      filters = {
        ...filters,
        [props.detailPageFilter.key]:
          props.detailPageFilter.key === AF_TAG_NARRATIVE
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
          lang: currentLanguage,
        },
      });
    }
  }, [currentLanguage]);

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
    sectorNames,
  };
}
