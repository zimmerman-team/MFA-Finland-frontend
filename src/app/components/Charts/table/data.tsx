import React from "react";
import {
  MUIDataTableOptions,
  MUIDataTableColumnDef,
  MUIDataTableIsRowCheck,
} from "mui-datatables";
import { createMuiTheme } from "@material-ui/core/styles";
import { LinkCell } from "app/components/Charts/table/common/cells/LinkCell";
import { ExpandableRows } from "app/components/Charts/table/common/rows/ExpandableRows";
import { MultiValuesCell } from "app/components/Charts/table/common/cells/MultiValuesCell";
import { formatLocale } from "app/utils/formatLocale";

export interface DataTableProps {
  options: MUIDataTableOptions;
  title: string | React.ReactNode;
  columns: MUIDataTableColumnDef[];
  data: Array<object | number[] | string[]>;
}

export const tableTheme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        width: "100%",
      },
    },
    MuiToolbar: {
      root: {
        display: "flex !important",
        padding: "10px 0px !important",
        "@media (max-width:600px)": {
          justifyContent: "space-between",
          "& > div": {
            flex: "0 0 auto",
          },
        },
      },
    },
    MuiTypography: {
      h6: {
        fontWeight: 700,
        color: "#2E4982",
        fontSize: "20px",
        fontFamily: "Finlandica",
      },
      body2: {
        fontSize: "12px",
        fontFamily: "Finlandica",
        color: "#B6B6B6 !important",
      },
    },
    MuiSvgIcon: {
      root: {
        fill: "#2E4982",
      },
    },
    MuiTableBody: {
      root: {
        backgroundColor: "#fff",
      },
    },
    MuiTableCell: {
      head: {
        color: "#2E4982",
        fontSize: "14px",
        lineHeight: "1rem",
        fontFamily: "Finlandica",
        backgroundColor: "#F8F8F8 !important",
        borderTop: "1px solid rgba(224, 224, 224, 1)",
      },
      body: {
        color: "#2E4063",
        fontSize: "14px",
        fontFamily: "Finlandica",
      },
      footer: {
        fontFamily: "Finlandica",
        borderBottomStyle: "none",
        "@media (max-width:600px)": {
          padding: "0px !important",
        },
      },
    },
    MuiInputBase: {
      input: {
        color: "#b6b6b6",
      },
    },
    MuiTablePagination: {
      selectIcon: {
        fill: "#b6b6b6",
      },
    },
    MuiPopover: {
      paper: {
        width: "fit-content",
      },
    },
  },
});

// Activities

export const SimpleActivitiesDataTableColumns: MUIDataTableColumnDef[] = [
  {
    name: "title",
    label: "Project Name",
    options: {
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        const link = `/activity/${encodeURIComponent(value.code)}`;
        return <LinkCell link={link} value={value.value} />;
      },
    },
  },
  {
    name: "year",
    label: "Year",
    options: {
      sort: false,
      setCellProps: () => ({ style: { minWidth: "120px", maxWidth: "150px" } }),
    },
  },
  {
    name: "committed",
    label: "Commitments",
    options: {
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return formatLocale(value);
      },
    },
  },
  {
    name: "disbursed",
    label: "Disbursements",
    options: {
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return formatLocale(value);
      },
    },
  },
];

export const SimpleActivitiesDataTableOptions: MUIDataTableOptions = {
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

export const ActivitiesDataTableColumns: MUIDataTableColumnDef[] = [
  {
    name: "Start date",
    options: {
      setCellProps: () => ({ style: { minWidth: "120px", maxWidth: "150px" } }),
      customBodyRender: (value) => {
        return <>{value ? value : "Date missing"}</>;
      },
    },
  },
  {
    name: "End date",
    options: {
      setCellProps: () => ({ style: { minWidth: "120px", maxWidth: "150px" } }),
      customBodyRender: (value) => {
        return <>{value ? value : "Date missing"}</>;
      },
    },
  },
  { name: "Status" },
  {
    name: "Activity title",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        const link = `/activity/${encodeURIComponent(value[0])}`;
        return <LinkCell link={link} value={value[1]} />;
      },
    },
  },
  {
    name: "Country(s)",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        const updValue = typeof value === "object" ? value : [];
        return <MultiValuesCell value={updValue} />;
      },
    },
  },
];

export const ActivitiesDataTableMockData: Array<
  object | number[] | string[]
> = [
  [
    "1 Jan 2019",
    "2 Jan 2019",
    "Implementation",
    ["1001", "Promoting Opportunities for Women s Empowerment and Rights 1"],
    ["Afghanistan", "China", "Kenya"],
    100,
  ],
  [
    "2 Jan 2019",
    "3 Jan 2019",
    "Implementation",
    ["1002", "Promoting Opportunities for Women s Empowerment and Rights 2"],
    ["Afghanistan", "China", "Kenya"],
    100,
  ],
  [
    "3 Jan 2019",
    "4 Jan 2019",
    "Implementation",
    ["1003", "Promoting Opportunities for Women s Empowerment and Rights 3"],
    ["Afghanistan", "China", "Kenya"],
    100,
  ],
];

export const ActivitiesDataTableOptions: MUIDataTableOptions = {
  print: true,
  elevation: 0,
  search: true,
  filter: false,
  download: true,
  rowHover: false,
  pagination: true,
  viewColumns: true,
  responsive: "standard",
  selectableRows: "none",
  selectableRowsHeader: false,
};

// Countries

export const CountriesDataTableColumns: MUIDataTableColumnDef[] = [
  {
    name: "Code",
  },
  {
    name: "Country",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        const link = `/country/${encodeURIComponent(value[1])}/projects`;
        return <LinkCell link={link} value={value[1]} />;
      },
    },
  },
  {
    name: "Activities count",
    options: {
      customBodyRender: (value) => (
        <span>{new Intl.NumberFormat("nl-NL").format(value)}</span>
      ),
    },
  },
];

export const CountriesDataTableMockData: Array<object | number[] | string[]> = [
  ["AF", ["AF", "Afghanistan"], 100],
  ["CN", ["CN", "China"], 100],
  ["KE", ["KE", "Kenya"], 100],
];

export const CountriesDataTableOptions: MUIDataTableOptions = {
  print: true,
  elevation: 0,
  search: true,
  filter: false,
  download: true,
  rowHover: false,
  pagination: true,
  viewColumns: true,
  responsive: "standard",
  selectableRows: "none",
  selectableRowsHeader: false,
};

// Organisations

export const OrganisationsDataTableColumns: MUIDataTableColumnDef[] = [
  { name: "IATI ref" },
  {
    name: "Organisation",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        const label = value[1] === "" ? value[0] : value[1];
        const link = `/organisation/${encodeURIComponent(value[0])}/projects`;
        return <LinkCell link={link} value={label} />;
      },
    },
  },
  {
    name: "Activities count",
    options: {
      customBodyRender: (value) => (
        <span>{new Intl.NumberFormat("nl-NL").format(value)}</span>
      ),
    },
  },
];

export const OrganisationsDataTableMockData: Array<
  object | number[] | string[]
> = [
  [
    "XM-DAC-6-4",
    ["XM-DAC-6-4", "Italian Agency for Development Cooperation"],
    100,
  ],
  [
    "XM-DAC-701-8",
    ["XM-DAC-701-8", "Japan International Cooperation Agency (JICA)"],
    100,
  ],
  [
    "XM-DAC-41114",
    ["XM-DAC-41114", "United Nations Development Programme (UNDP)"],
    100,
  ],
];

export const OrganisationsDataTableOptions: MUIDataTableOptions = {
  print: true,
  elevation: 0,
  search: true,
  filter: false,
  download: true,
  rowHover: false,
  pagination: true,
  viewColumns: true,
  responsive: "standard",
  selectableRows: "none",
  selectableRowsHeader: false,
};

// Donors

export const DonorsDataTableColumns: MUIDataTableColumnDef[] = [
  {
    name: "IATI ref",
  },
  {
    name: "Donor",
    options: {
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        const label = value[1] === "" ? value[0] : value[1];
        const link = `/donor/${encodeURIComponent(value[0])}/projects`;
        return <LinkCell link={link} value={label} />;
      },
    },
  },
  {
    name: "Activities count",
    options: {
      customBodyRender: (value) => (
        <span>{new Intl.NumberFormat("nl-NL").format(value)}</span>
      ),
    },
  },
];

export const DonorsDataTableMockData: Array<
  object | number[] | string[]
> = OrganisationsDataTableMockData;

export const DonorsDataTableOptions: MUIDataTableOptions = {
  print: true,
  elevation: 0,
  search: true,
  filter: false,
  download: true,
  rowHover: false,
  pagination: true,
  viewColumns: true,
  responsive: "standard",
  selectableRows: "none",
  selectableRowsHeader: false,
};

// Publishers

export const PublishersDataTableColumns: MUIDataTableColumnDef[] = [
  { name: "IATI ref" },
  {
    name: "Publisher",
    options: {
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        const label = value[1] === "" ? value[0] : value[1];
        const link = `/publisher/${encodeURIComponent(value[0])}/projects`;
        return <LinkCell link={link} value={label} />;
      },
    },
  },
  {
    name: "Activities count",
    options: {
      customBodyRender: (value) => (
        <span>{new Intl.NumberFormat("nl-NL").format(value)}</span>
      ),
    },
  },
];

export const PublishersDataTableMockData: Array<
  object | number[] | string[]
> = OrganisationsDataTableMockData;

export const PublishersDataTableOptions: MUIDataTableOptions = {
  print: true,
  elevation: 0,
  search: true,
  filter: false,
  download: true,
  rowHover: false,
  pagination: true,
  viewColumns: true,
  responsive: "standard",
  selectableRows: "none",
  selectableRowsHeader: false,
};

// Sectors

export const SectorsDataTableColumns: MUIDataTableColumnDef[] = [
  {
    name: "code",
    label: "Code",
    options: { sort: false },
  },
  {
    name: "title",
    label: "Category / DAC3 / DAC5",
    options: {
      sort: false,
    },
  },
  {
    name: "size",
    label: "Activity count",
    options: { sort: false },
  },
  { name: "sum", label: "Sum of activities", options: { sort: false } },
];

export const SectorsDataTableMockData: Array<object | number[] | string[]> = [
  {
    code: "1",
    title: {
      code: "1",
      name: "Sector 1",
    },
    size: 100,
    children: [
      {
        code: "1A",
        title: "Sector 1 | A",
        size: 50,
        children: [
          {
            code: "1AI",
            title: "Sector 1 | A | I",
            size: 25,
          },
          {
            code: "1AIV",
            title: "Sector 1 | A | IV",
            size: 25,
          },
        ],
      },
      {
        code: "1B",
        title: "Sector 1 | B",
        size: 50,
      },
    ],
  },
  {
    code: "2",
    title: {
      code: "2",
      name: "Sector 2",
    },
    size: 200,
    children: [
      {
        code: "2A",
        title: "Sector 2 | A",
        size: 100,
        children: [
          {
            code: "2AI",
            title: "Sector 2 | A | I",
            size: 50,
          },
          {
            code: "2AIV",
            title: "Sector 2 | A | IV",
            size: 50,
          },
        ],
      },
      {
        code: "2B",
        title: "Sector 2 | B",
        size: 100,
      },
    ],
  },
];

export const SectorsDataTableOptions: MUIDataTableOptions = {
  print: true,
  elevation: 0,
  search: true,
  filter: false,
  download: true,
  rowHover: true,
  serverSide: true,
  pagination: true,
  viewColumns: true,
  expandableRows: true,
  responsive: "standard",
  selectableRows: "none",
  expandableRowsHeader: false,
  selectableRowsHeader: false,
  expandableRowsOnClick: true,
  renderExpandableRow: (
    rowData: string[],
    rowMeta: { dataIndex: number; rowIndex: number }
  ) => {
    //@ts-ignore
    const childData = SectorsDataTableMockData[rowMeta.rowIndex].children;
    if (childData) {
      return <ExpandableRows data={childData} level={1} />;
    }
  },
  isRowExpandable: (dataIndex: number, expandedRows?: MUIDataTableIsRowCheck) =>
    //@ts-ignore
    SectorsDataTableMockData[dataIndex].children,
};

//TODO: add table functionalities
