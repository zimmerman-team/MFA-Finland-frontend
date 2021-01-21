export interface SideListDataItem {
  title: string;
  color: string;
}

interface SideListData {
  children: SideListDataItem[];
}

export interface SideListProps {
  title: string;
  selected: string;
  data: SideListData;
  type?: string;
  overflowList?: boolean;
  withLinks?: boolean;
  handleClick?: Function;
}
