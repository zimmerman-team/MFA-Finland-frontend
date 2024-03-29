import React from "react";
import get from "lodash/get";
import { useRecoilState } from "recoil";
import { useCMSData } from "app/hooks/useCMSData";
import { searchFocusAtom } from "app/state/recoil/atoms";
import { useDebounce, useUpdateEffect, useUnmount } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { SearchComponentLayout } from "app/components/AppBar/common/Search/layout";
import {
  datapath,
  countpath,
  thematicAreas,
  searchNavItems,
} from "app/components/AppBar/common/Search/data";

export function SearchComponent() {
  const [value, setValue] = React.useState("");
  const cmsData = useCMSData({ returnData: true });
  const targetRef = React.useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useRecoilState(searchFocusAtom);
  const [resultType, setResultType] = React.useState(searchNavItems[0].name);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  const loading = useStoreState(
    (state) =>
      state.searchActivities.loading ||
      state.searchThematicareas.loading ||
      state.searchCountries.loading ||
      state.searchOrganisations.loading ||
      state.searchSectors.loading
  );
  const searchData = useStoreState((state) => ({
    Projects: {
      count: get(state.searchActivities, countpath, 0),
      data: get(state.searchActivities, datapath, []),
    },
    "Thematic areas": {
      count: get(state.searchThematicareas, countpath, 0),
      data: get(state.searchThematicareas, datapath, []),
    },
    Countries: {
      count: get(state.searchCountries, countpath, 0),
      data: get(state.searchCountries, datapath, []),
    },
    Organisations: {
      count: get(state.searchOrganisations, countpath, 0),
      data: get(state.searchOrganisations, datapath, []),
    },
    Sectors: {
      count: get(state.searchSectors, countpath, 0),
      data: get(state.searchSectors, datapath, []),
    },
    All: {
      count:
        get(state.searchActivities, countpath, 0) +
        get(state.searchCountries, countpath, 0) +
        get(state.searchOrganisations, countpath, 0) +
        get(state.searchSectors, countpath, 0) +
        get(state.searchDonors, countpath, 0),
      data: [
        ...get(state.searchActivities, datapath, []),
        ...get(state.searchCountries, datapath, []),
        ...get(state.searchOrganisations, datapath, []),
        ...get(state.searchSectors, datapath, []),
        ...get(state.searchDonors, datapath, []),
      ],
    },
  }));
  const searchActions = useStoreActions((actions) => ({
    activitiesAction: actions.searchActivities.fetch,
    thematicareasAction: actions.searchThematicareas.fetch,
    countriesAction: actions.searchCountries.fetch,
    organisationsAction: actions.searchOrganisations.fetch,
    sectorsAction: actions.searchSectors.fetch,
  }));
  const clearSearchActions = useStoreActions((actions) => ({
    activitiesAction: actions.searchActivities.clear,
    thematicareasAction: actions.searchThematicareas.clear,
    countriesAction: actions.searchCountries.clear,
    organisationsAction: actions.searchOrganisations.clear,
    sectorsAction: actions.searchSectors.clear,
  }));

  function clearSearch() {
    setValue("");
    clearSearchActions.activitiesAction();
    clearSearchActions.thematicareasAction();
    clearSearchActions.countriesAction();
    clearSearchActions.organisationsAction();
    clearSearchActions.sectorsAction();
  }

  function callActivitiesAction(q: string) {
    searchActions.activitiesAction({
      values: {
        q,
      },
    });
    searchActions.thematicareasAction({
      values: {
        q,
      },
    });
    searchActions.countriesAction({
      values: {
        q,
      },
    });
    searchActions.organisationsAction({
      values: {
        q,
      },
    });
    searchActions.sectorsAction({
      values: {
        q,
      },
    });
  }

  useDebounce(
    () => {
      if (value.length > 3) {
        callActivitiesAction(value);
      }
    },
    500,
    [value]
  );

  useUnmount(() => {
    clearSearch();
  });

  React.useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: get(targetRef, "current.offsetWidth", 0),
        height: get(targetRef, "current.offsetHeight", 0),
      });
    }
  }, [isFocused]);

  // Projects load more items
  const [ProjectsPage, setProjectsPage] = React.useState(0);
  useUpdateEffect(() => {
    if (value.length > 3) {
      searchActions.activitiesAction({
        values: {
          q: value,
          page: ProjectsPage,
        },
        addOnData: true,
      });
    }
  }, [ProjectsPage]);

  // Countries load more items
  const [CountriesPage, setCountriesPage] = React.useState(0);
  useUpdateEffect(() => {
    if (value.length > 3) {
      searchActions.countriesAction({
        values: {
          q: value,
          page: CountriesPage,
        },
        addOnData: true,
      });
    }
  }, [CountriesPage]);

  // Organisations load more items
  const [OrganisationsPage, setOrganisationsPage] = React.useState(0);
  useUpdateEffect(() => {
    if (value.length > 3) {
      searchActions.organisationsAction({
        values: {
          q: value,
          page: OrganisationsPage,
        },
        addOnData: true,
      });
    }
  }, [OrganisationsPage]);

  // Sectors load more items
  const [SectorsPage, setSectorsPage] = React.useState(0);
  useUpdateEffect(() => {
    if (value.length > 3) {
      searchActions.sectorsAction({
        values: {
          q: value,
          page: SectorsPage,
        },
        addOnData: true,
      });
    }
  }, [SectorsPage]);

  // load more items of result type selected
  function loadMore() {
    switch (resultType) {
      case searchNavItems[0].name:
        setProjectsPage(ProjectsPage + 1);
        break;
      case searchNavItems[4].name:
        setCountriesPage(CountriesPage + 1);
        break;
      case searchNavItems[3].name:
        setOrganisationsPage(OrganisationsPage + 1);
        break;
      case searchNavItems[2].name:
        setSectorsPage(SectorsPage + 1);
        break;
      case searchNavItems[5].name:
        setProjectsPage(ProjectsPage + 1);
        setCountriesPage(CountriesPage + 1);
        setOrganisationsPage(OrganisationsPage + 1);
        setSectorsPage(SectorsPage + 1);
        break;
      default:
        break;
    }
  }

  function onClickAway(event: React.MouseEvent<Document>) {
    close();
  }

  function close() {
    if (isFocused) {
      clearSearch();
      setIsFocused(false);
    }
  }

  const renderedResults = get(searchData, `[${resultType}].data`, []);
  const renderedResultsCount = get(searchData, `[${resultType}].count`, 0);

  const hasMoreOfType = renderedResults.length + 10 - renderedResultsCount < 10;

  return (
    <SearchComponentLayout
      value={value}
      close={close}
      cmsData={cmsData}
      loading={loading}
      loadMore={loadMore}
      setValue={setValue}
      targetRef={targetRef}
      searchData={searchData}
      resultType={resultType}
      width={dimensions.width}
      onClickAway={onClickAway}
      setResultType={setResultType}
      hasMoreOfType={hasMoreOfType}
    />
  );
}
