import React from "react";
import { formatLocale } from "app/utils/formatLocale";
import { MUIDataTableOptions, MUIDataTableColumnDef } from "mui-datatables";
import { LinkCell } from "app/components/Charts/table/common/cells/LinkCell";

export interface DataProps {
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
  // values: string[];
}

export interface ThematicAreasProps {
  data: DataProps[];
  showOnlyViz: boolean;
  selectedVizItemId: string | number | null;
  setSelectedVizItem: (name: string | number | null) => void;
}

// export const thematicareasMockData: DataProps[] = [
//   {
//     name: "Thematic area C (Main priority)",
//     color: "#819DAB",
//     area: "Improving democracy in societies",
//     value: 141774396.37,
//     secondary: {
//       name: "Priority area 3, secondary",
//       area: "Improving democracy in societies",
//       value: 253237682.60999998,
//     },
//     size: 200,
//     // values: ["Main priority", "€141,774,396.37", "Secondary priority"],
//   },
//   {
//     name: "Thematic area D (Main priority)",
//     color: "#425346",
//     area: "Improving food security, access to water and sustainability",
//     value: 136423111.40999997,
//     secondary: {
//       name: "Priority area 4, secondary",
//       area: "Improving food security, access to water and sustainability",
//       value: 147973623.21,
//     },
//     size: 180,
//     // values: ["Main priority", "€136,423,111.41", "Secondary priority"],
//   },
//   {
//     name: "Thematic area A (Main priority)",
//     color: "#AE4764",
//     area: "Strengthening of the rights and status of women and girls",
//     value: 117256606.04000002,
//     secondary: {
//       name: "Priority area 1, secondary",
//       area: "Strengthening of the rights and status of women and girls",
//       value: 363149146.28000003,
//     },
//     size: 140,
//     // values: ["Main priority", "€117,256,606.04", "Secondary priority"],
//   },
//   {
//     name: "Thematic area B (Main priority)",
//     color: "#DA8E68",
//     area:
//       "Generating jobs, livelihood opportunities and well-being in a developing country",
//     value: 28573232.650000002,
//     secondary: {
//       name: "Priority area 2, secondary",
//       area:
//         "Generating jobs, livelihood opportunities and well-being in a developing country",
//       value: 222483473.61,
//     },
//     size: 100,
//     // values: ["Main priority", "€28,573,232.65", "Secondary priority"],
//   },
// ];

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
