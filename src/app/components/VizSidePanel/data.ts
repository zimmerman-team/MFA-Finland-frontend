export interface VizSidePanelItemProps {
  id: string | number;
  name: string;
  value: string;
  color?: string;
  link?: string;
  children?: VizSidePanelItemProps[];
}

export interface VizSidePanelProps {
  vizType: string;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  scrollableHeight: number;
  items: VizSidePanelItemProps[];
  selectedVizItem: string | number | null;
  expandedVizItem: string | number | null;

  setSelected: React.Dispatch<React.SetStateAction<string | number | null>>;
  setExpanded: React.Dispatch<React.SetStateAction<string | number | null>>;
}
