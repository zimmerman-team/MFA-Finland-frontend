import isEqual from "lodash/isEqual";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { useUnmount, useUpdateEffect } from "react-use";
import { useHistory, useLocation } from "react-router-dom";
import { useComponentWillMount } from "app/hooks/useCompWillMount";
import {
  defaultfilters,
  selectedFilterAtom,
  SelectedFilterAtomModel,
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
} from "app/utils/getAPIFormattedFilters";

export function useUrlFilters() {
  const history = useHistory();
  const location = useLocation();
  const [selectedFilters, setSelectedFilters] =
    useRecoilState(selectedFilterAtom);

  useComponentWillMount({
    action: () => {
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
      const defaulttiedstatus = currentURLParams.get(
        AF_DEFAULT_TIED_STATUS_CODE
      );
      const defaultflowtype = currentURLParams.get(AF_DEFAULT_FLOW_TYPE_CODE);
      const collaborationtype = currentURLParams.get(
        AF_COLLABORATION_TYPE_CODE
      );
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

      setSelectedFilters(updatedSelectedFilters);
    },
  });

  useUnmount(() => setSelectedFilters(defaultfilters));

  useUpdateEffect(() => {
    const currentUrlParams = new URLSearchParams(history.location.search);
    if (selectedFilters.countries.length > 0) {
      currentUrlParams.set(AF_COUNTRY, selectedFilters.countries.join(","));
    } else {
      currentUrlParams.delete(AF_COUNTRY);
    }
    if (selectedFilters.regions.length > 0) {
      currentUrlParams.set(AF_REGION, selectedFilters.regions.join(","));
    } else {
      currentUrlParams.delete(AF_REGION);
    }
    if (selectedFilters.sectors.length > 0) {
      currentUrlParams.set(AF_SECTOR, selectedFilters.sectors.join(","));
    } else {
      currentUrlParams.delete(AF_SECTOR);
    }
    if (selectedFilters.organisations.length > 0) {
      currentUrlParams.set(
        AF_PARTICIPATING_ORG_REF,
        selectedFilters.organisations.join(",")
      );
    } else {
      currentUrlParams.delete(AF_PARTICIPATING_ORG_REF);
    }
    if (selectedFilters.activitystatus.length > 0) {
      currentUrlParams.set(
        AF_ACTIVITY_STATUS_CODE,
        selectedFilters.activitystatus.join(",")
      );
    } else {
      currentUrlParams.delete(AF_ACTIVITY_STATUS_CODE);
    }
    if (selectedFilters.activityscope.length > 0) {
      currentUrlParams.set(
        AF_ACTIVITY_SCOPE_CODE,
        selectedFilters.activityscope.join(",")
      );
    } else {
      currentUrlParams.delete(AF_ACTIVITY_SCOPE_CODE);
    }
    if (selectedFilters.tag.length > 0) {
      currentUrlParams.set(AF_TAG_NARRATIVE, selectedFilters.tag.join(","));
    } else {
      currentUrlParams.delete(AF_TAG_NARRATIVE);
    }
    if (selectedFilters.sdg.length > 0) {
      currentUrlParams.set(AF_TAG_CODE, selectedFilters.sdg.join(","));
    } else {
      currentUrlParams.delete(AF_TAG_CODE);
    }
    if (selectedFilters.defaultaidtype.length > 0) {
      currentUrlParams.set(
        AF_DEFAULT_AID_TYPE_CODE,
        selectedFilters.defaultaidtype.join(",")
      );
    } else {
      currentUrlParams.delete(AF_DEFAULT_AID_TYPE_CODE);
    }
    if (selectedFilters.defaultflowtype.length > 0) {
      currentUrlParams.set(
        AF_DEFAULT_FLOW_TYPE_CODE,
        selectedFilters.defaultflowtype.join(",")
      );
    } else {
      currentUrlParams.delete(AF_DEFAULT_FLOW_TYPE_CODE);
    }
    if (selectedFilters.defaulttiedstatus.length > 0) {
      currentUrlParams.set(
        AF_DEFAULT_TIED_STATUS_CODE,
        selectedFilters.defaulttiedstatus.join(",")
      );
    } else {
      currentUrlParams.delete(AF_DEFAULT_TIED_STATUS_CODE);
    }
    if (selectedFilters.collaborationtype.length > 0) {
      currentUrlParams.set(
        AF_COLLABORATION_TYPE_CODE,
        selectedFilters.collaborationtype.join(",")
      );
    } else {
      currentUrlParams.delete(AF_COLLABORATION_TYPE_CODE);
    }
    if (selectedFilters.policymarker.length > 0) {
      currentUrlParams.set(
        AF_POLICY_MARKER_CODE,
        selectedFilters.policymarker.join(",")
      );
    } else {
      currentUrlParams.delete(AF_POLICY_MARKER_CODE);
    }
    if (selectedFilters.budgetlines.length > 0) {
      currentUrlParams.set(
        "budget_line",
        selectedFilters.budgetlines.join(",")
      );
    } else {
      currentUrlParams.delete("budget_line");
    }
    if (selectedFilters.humanrights.length > 0) {
      currentUrlParams.set(
        "human_rights_approach",
        selectedFilters.humanrights.join(",")
      );
    } else {
      currentUrlParams.delete("human_rights_approach");
    }
    if (selectedFilters.years.length > 0) {
      currentUrlParams.set("years", selectedFilters.years.join(","));
    } else {
      currentUrlParams.delete("years");
    }

    const queryString = decodeURIComponent(currentUrlParams.toString());
    // @Juan replaced history.push with history.replace -> solves the issue of double entries in the history stack. Tested it out and seems to work - please revert when unexpected behaviour arises.
    history.replace({
      pathname: history.location.pathname,
      search: queryString,
    });
  }, [selectedFilters]);

  useUpdateEffect(() => {
    onLocationSearchChange(selectedFilters, setSelectedFilters);
  }, [location.search]);

  return null;
}

export function onLocationSearchChange(
  selectedFilters: SelectedFilterAtomModel,
  setSelectedFilters: SetterOrUpdater<SelectedFilterAtomModel>
) {
  const updatedSelectedFilters = { ...selectedFilters };
  const currentUrlParams = new URLSearchParams(location.search);
  const countries = currentUrlParams.get(AF_COUNTRY);
  const regions = currentUrlParams.get(AF_REGION);
  const sectors = currentUrlParams.get(AF_SECTOR);
  const organisations = currentUrlParams.get(AF_PARTICIPATING_ORG_REF);
  const activitystatus = currentUrlParams.get(AF_ACTIVITY_STATUS_CODE);
  const activityscope = currentUrlParams.get(AF_ACTIVITY_SCOPE_CODE);
  const tag = currentUrlParams.get(AF_TAG_NARRATIVE);
  const sdg = currentUrlParams.get(AF_TAG_CODE);
  const defaultaidtype = currentUrlParams.get(AF_DEFAULT_AID_TYPE_CODE);
  const defaulttiedstatus = currentUrlParams.get(AF_DEFAULT_TIED_STATUS_CODE);
  const defaultflowtype = currentUrlParams.get(AF_DEFAULT_FLOW_TYPE_CODE);
  const collaborationtype = currentUrlParams.get(AF_COLLABORATION_TYPE_CODE);
  const policymarker = currentUrlParams.get(AF_POLICY_MARKER_CODE);
  const budgetlines = currentUrlParams.get("budget_line");
  const humanrights = currentUrlParams.get("human_rights_approach");
  const years = currentUrlParams.get("years");

  if (countries) {
    updatedSelectedFilters.countries = countries.split(",");
  } else if (updatedSelectedFilters.countries.length > 0) {
    updatedSelectedFilters.countries = [];
  }
  if (regions) {
    updatedSelectedFilters.regions = regions.split(",");
  } else if (updatedSelectedFilters.regions.length > 0) {
    updatedSelectedFilters.regions = [];
  }
  if (sectors) {
    updatedSelectedFilters.sectors = sectors.split(",");
  } else if (updatedSelectedFilters.sectors.length > 0) {
    updatedSelectedFilters.sectors = [];
  }
  if (organisations) {
    updatedSelectedFilters.organisations = organisations.split(",");
  } else if (updatedSelectedFilters.organisations.length > 0) {
    updatedSelectedFilters.organisations = [];
  }
  if (activitystatus) {
    updatedSelectedFilters.activitystatus = activitystatus.split(",");
  } else if (updatedSelectedFilters.activitystatus.length > 0) {
    updatedSelectedFilters.activitystatus = [];
  }
  if (activityscope) {
    updatedSelectedFilters.activityscope = activityscope.split(",");
  } else if (updatedSelectedFilters.activityscope.length > 0) {
    updatedSelectedFilters.activityscope = [];
  }
  if (tag) {
    updatedSelectedFilters.tag = tag.split(",");
  } else if (updatedSelectedFilters.tag.length > 0) {
    updatedSelectedFilters.tag = [];
  }
  if (sdg) {
    updatedSelectedFilters.sdg = sdg.split(",");
  } else if (updatedSelectedFilters.sdg.length > 0) {
    updatedSelectedFilters.sdg = [];
  }
  if (defaultaidtype) {
    updatedSelectedFilters.defaultaidtype = defaultaidtype.split(",");
  } else if (updatedSelectedFilters.defaultaidtype.length > 0) {
    updatedSelectedFilters.defaultaidtype = [];
  }
  if (defaultflowtype) {
    updatedSelectedFilters.defaultflowtype = defaultflowtype.split(",");
  } else if (updatedSelectedFilters.defaultflowtype.length > 0) {
    updatedSelectedFilters.defaultflowtype = [];
  }
  if (defaulttiedstatus) {
    updatedSelectedFilters.defaulttiedstatus = defaulttiedstatus.split(",");
  } else if (updatedSelectedFilters.defaulttiedstatus.length > 0) {
    updatedSelectedFilters.defaulttiedstatus = [];
  }
  if (collaborationtype) {
    updatedSelectedFilters.collaborationtype = collaborationtype.split(",");
  } else if (updatedSelectedFilters.collaborationtype.length > 0) {
    updatedSelectedFilters.collaborationtype = [];
  }
  if (policymarker) {
    updatedSelectedFilters.policymarker = policymarker.split(",");
  } else if (updatedSelectedFilters.policymarker.length > 0) {
    updatedSelectedFilters.policymarker = [];
  }
  if (budgetlines) {
    updatedSelectedFilters.budgetlines = budgetlines.split(",");
  } else if (updatedSelectedFilters.budgetlines.length > 0) {
    updatedSelectedFilters.budgetlines = [];
  }
  if (humanrights) {
    updatedSelectedFilters.humanrights = humanrights.split(",");
  } else if (updatedSelectedFilters.humanrights.length > 0) {
    updatedSelectedFilters.humanrights = [];
  }
  if (years) {
    updatedSelectedFilters.years = years.split(",");
  } else if (updatedSelectedFilters.years.length > 0) {
    updatedSelectedFilters.years = [];
  }

  if (!isEqual(selectedFilters, updatedSelectedFilters)) {
    setSelectedFilters(updatedSelectedFilters);
  }
}
