import isEqual from "lodash/isEqual";
import { useRecoilState } from "recoil";
import { useUnmount, useUpdateEffect } from "react-use";
import { useHistory, useLocation } from "react-router-dom";
import { useComponentWillMount } from "app/hooks/useCompWillMount";
import { defaultfilters, selectedFilterAtom } from "app/state/recoil/atoms";

export function useUrlFilters() {
  const history = useHistory();
  const location = useLocation();
  const [selectedFilters, setSelectedFilters] = useRecoilState(
    selectedFilterAtom
  );

  useComponentWillMount({
    action: () => {
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
      const defaulttiedstatus = currentUrlParams.get(
        "default_tied_status_code"
      );
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

      setSelectedFilters(updatedSelectedFilters);
    },
  });

  useUnmount(() => setSelectedFilters(defaultfilters));

  useUpdateEffect(() => {
    const currentUrlParams = new URLSearchParams(history.location.search);
    if (selectedFilters.countries.length > 0) {
      currentUrlParams.set(
        "recipient_country_code",
        selectedFilters.countries.join(",")
      );
    } else {
      currentUrlParams.delete("recipient_country_code");
    }
    if (selectedFilters.regions.length > 0) {
      currentUrlParams.set(
        "recipient_region_code",
        selectedFilters.regions.join(",")
      );
    } else {
      currentUrlParams.delete("recipient_region_code");
    }
    if (selectedFilters.sectors.length > 0) {
      currentUrlParams.set("sector_code", selectedFilters.sectors.join(","));
    } else {
      currentUrlParams.delete("sector_code");
    }
    if (selectedFilters.organisations.length > 0) {
      currentUrlParams.set(
        "participating_org_ref",
        selectedFilters.organisations.join(",")
      );
    } else {
      currentUrlParams.delete("participating_org_ref");
    }
    if (selectedFilters.activitystatus.length > 0) {
      currentUrlParams.set(
        "activity_status_code",
        selectedFilters.activitystatus.join(",")
      );
    } else {
      currentUrlParams.delete("activity_status_code");
    }
    if (selectedFilters.activityscope.length > 0) {
      currentUrlParams.set(
        "activity_scope_code",
        selectedFilters.activityscope.join(",")
      );
    } else {
      currentUrlParams.delete("activity_scope_code");
    }
    if (selectedFilters.tag.length > 0) {
      currentUrlParams.set("tag_narrative", selectedFilters.tag.join(","));
    } else {
      currentUrlParams.delete("tag_narrative");
    }
    if (selectedFilters.sdg.length > 0) {
      currentUrlParams.set("tag_code", selectedFilters.sdg.join(","));
    } else {
      currentUrlParams.delete("tag_code");
    }
    if (selectedFilters.defaultaidtype.length > 0) {
      currentUrlParams.set(
        "default_aid_type_code",
        selectedFilters.defaultaidtype.join(",")
      );
    } else {
      currentUrlParams.delete("default_aid_type_code");
    }
    if (selectedFilters.defaultflowtype.length > 0) {
      currentUrlParams.set(
        "default_flow_type_code",
        selectedFilters.defaultflowtype.join(",")
      );
    } else {
      currentUrlParams.delete("default_flow_type_code");
    }
    if (selectedFilters.defaulttiedstatus.length > 0) {
      currentUrlParams.set(
        "default_tied_status_code",
        selectedFilters.defaulttiedstatus.join(",")
      );
    } else {
      currentUrlParams.delete("default_tied_status_code");
    }
    if (selectedFilters.collaborationtype.length > 0) {
      currentUrlParams.set(
        "collaboration_type_code",
        selectedFilters.collaborationtype.join(",")
      );
    } else {
      currentUrlParams.delete("collaboration_type_code");
    }
    if (selectedFilters.policymarker.length > 0) {
      currentUrlParams.set(
        "policy_marker_code",
        selectedFilters.policymarker.join(",")
      );
    } else {
      currentUrlParams.delete("policy_marker_code");
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
    const updatedSelectedFilters = { ...selectedFilters };
    const currentUrlParams = new URLSearchParams(location.search);
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
  }, [location.search]);

  return null;
}
