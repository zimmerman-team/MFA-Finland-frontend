export interface VizTabsProps {}

export interface TabProps {
  url: string;
  name: string;
}

export const vizTabs: TabProps[] = [
  {
    name: "ODA",
    url: "/viz/oda",
  },
  {
    name: "Thematic areas",
    url: "/viz/thematic-areas",
  },
  {
    name: "Sectors",
    url: "/viz/sectors",
  },
  {
    name: "Countries/Regions",
    url: "/viz/countries-regions",
  },
  {
    name: "Organisations",
    url: "/viz/organisations",
  },
  {
    name: "Budget lines",
    url: "/viz/budget-lines",
  },
  {
    name: "Projects",
    url: "/viz/projects",
  },
];
