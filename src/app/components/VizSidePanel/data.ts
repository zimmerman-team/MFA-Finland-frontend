export interface VizSidePanelItemProps {
  id: string | number;
  name: string;
  value: string;
  color?: string;
  children?: VizSidePanelItemProps[];
}

export interface VizSidePanelProps {
  vizType: string;
  activeTab: string;
  scrollableHeight: number;
  items: VizSidePanelItemProps[];
  selectedVizItem: string | number | null;
  expandedVizItem: string | number | null;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setSelected: React.Dispatch<React.SetStateAction<string | number | null>>;
  setExpanded: React.Dispatch<React.SetStateAction<string | number | null>>;
}
