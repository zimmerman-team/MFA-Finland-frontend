/* eslint-disable @typescript-eslint/camelcase */
import get from "lodash/get";
import { useRecoilState } from "recoil";
import { useMount, useUpdateEffect } from "react-use";
import { selectedFilterAtom } from "app/state/recoil/atoms";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";

export function useInitialLoad() {
  const countriesfilterOptionsAction = useStoreActions(
    (actions) => actions.filterOptions.countries.fetch
  );
  const regionsfilterOptionsAction = useStoreActions(
    (actions) => actions.filterOptions.regions.fetch
  );
  const sectorsfilterOptionsAction = useStoreActions(
    (actions) => actions.filterOptions.sectors.fetch
  );
  const thematicareasfilterOptionsAction = useStoreActions(
    (actions) => actions.filterOptions.thematicareas.fetch
  );
  const organisationsfilterOptionsAction = useStoreActions(
    (actions) => actions.filterOptions.organisations.fetch
  );
  const activitystatusfilterOptionsAction = useStoreActions(
    (actions) => actions.filterOptions.activitystatus.fetch
  );
  const sdgsfilterOptionsAction = useStoreActions(
    (actions) => actions.filterOptions.sdgs.fetch
  );
  const policymarkersfilterOptionsAction = useStoreActions(
    (actions) => actions.filterOptions.policymarkers.fetch
  );
  const aidtypesfilterOptionsAction = useStoreActions(
    (actions) => actions.filterOptions.aidtypes.fetch
  );
  const budgetlinesfilterOptionsAction = useStoreActions(
    (actions) => actions.filterOptions.budgetlines.fetch
  );
  const filtersUpdatedClear = useStoreActions(
    (actions) => actions.filtersUpdated.clear
  );

  const [selectedFilters] = useRecoilState(selectedFilterAtom);
  const countriesfilterOptionsData = useStoreState(
    (state) => state.filterOptions.countries.data
  );

  function filterOptionsCall() {
    countriesfilterOptionsAction({
      values: {
        filter_type: "countries",
        // filters: getAPIFormattedFilters(selectedFilters),
      },
    });
    regionsfilterOptionsAction({
      values: {
        filter_type: "regions",
        // filters: getAPIFormattedFilters(selectedFilters),
      },
    });
    sectorsfilterOptionsAction({
      values: {
        filter_type: "sectors",
        // filters: getAPIFormattedFilters(selectedFilters),
      },
    });
    thematicareasfilterOptionsAction({
      values: {
        filter_type: "thematicareas",
        // filters: getAPIFormattedFilters(selectedFilters),
      },
    });
    organisationsfilterOptionsAction({
      values: {
        filter_type: "organisations",
        // filters: getAPIFormattedFilters(selectedFilters),
      },
    });
    sdgsfilterOptionsAction({
      values: {
        filter_type: "sdgs",
        // filters: getAPIFormattedFilters(selectedFilters),
      },
    });
    activitystatusfilterOptionsAction({
      values: {
        filter_type: "activitystatus",
        // filters: getAPIFormattedFilters(selectedFilters),
      },
    });
    policymarkersfilterOptionsAction({
      values: {
        filter_type: "policymarker",
        // filters: getAPIFormattedFilters(selectedFilters),
      },
    });
    aidtypesfilterOptionsAction({
      values: {
        filter_type: "defaultaidtype",
        // filters: getAPIFormattedFilters(selectedFilters),
      },
    });
    budgetlinesfilterOptionsAction({
      values: {
        filter_type: "budgetlines",
        // filters: getAPIFormattedFilters(selectedFilters),
      },
    });
  }

  useMount(() => {
    // filterOptionsCall();
  });

  useUpdateEffect(() => {
    filtersUpdatedClear();
  }, [selectedFilters]);

  return null;
}
