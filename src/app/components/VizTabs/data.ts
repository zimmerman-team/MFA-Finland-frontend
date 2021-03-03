export interface VizTabsProps {}

export interface TabProps {
  url: string;
  name: string;
  cmsKey?: string;
}

export const vizTabs: TabProps[] = [
  {
    name: "ODA",
    url: "/viz/oda",
  },
  {
    name: "Thematic areas",
    url: "/viz/thematic-areas",
    cmsKey: "general.thematicareas",
  },
  {
    name: "Sectors",
    url: "/viz/sectors",
    cmsKey: "general.sectors",
  },
  {
    name: "Countries/Regions",
    url: "/viz/countries-regions",
    cmsKey: "viz.countriesregions",
  },
  {
    name: "Organisations",
    url: "/viz/organisations",
    cmsKey: "general.organisations",
  },
  {
    name: "Budget lines",
    url: "/viz/budget-lines",
    cmsKey: "general.budgetlines",
  },
  {
    name: "Projects",
    url: "/viz/projects",
    cmsKey: "viz.projects",
  },
];
