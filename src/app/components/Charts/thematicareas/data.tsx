import React from "react";
import { formatLocale } from "app/utils/formatLocale";
import { MUIDataTableOptions, MUIDataTableColumnDef } from "mui-datatables";
import { LinkCell } from "app/components/Charts/table/common/cells/LinkCell";

export interface DataProps {
  ref: string;
  name: string;
  size: number;
  area: string;
  color: string;
  value: number;
  primary: {
    name: string;
    area: string;
    value: number;
  };
  secondary: {
    name: string;
    area: string;
    value: number;
  };
}

export interface ThematicAreasProps {
  data: DataProps[];
  showOnlyViz: boolean;
  linkedLabels?: boolean;
  showSingleCircle?: boolean;
  selectedVizItemId: string | number | null;
  setSelectedVizItem: (name: string | number | null) => void;
}

export const directions = [
  ["top", "left"],
  ["right", "top"],
  ["bottom", "right"],
  ["left", "bottom"],
];

export const thematicAreasDataTableOptions: MUIDataTableOptions = {
  print: false,
  elevation: 0,
  search: true,
  filter: false,
  download: false,
  rowHover: false,
  pagination: true,
  viewColumns: false,
  responsive: "standard",
  selectableRows: "none",
  selectableRowsHeader: false,
};

export const thematicAreasDataTableColumns: MUIDataTableColumnDef[] = [
  {
    name: "ref",
    label: "",
    options: {
      display: false,
    },
  },
  {
    name: "area",
    label: "Area",
    options: {
      customBodyRender: (value, tableMeta) => {
        const link = `/thematic-area/${encodeURIComponent(
          tableMeta.rowData[0]
        )}`;
        return <LinkCell link={link} value={value} />;
      },
    },
  },
  {
    name: "value",
    label: "Disbursements",
    options: {
      sort: false,
      customBodyRender: (value) => {
        return formatLocale(value);
      },
    },
  },
];
