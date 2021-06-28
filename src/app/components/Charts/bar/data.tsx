import { formatLocale } from "app/utils/formatLocale";
import { BarExtendedDatum, BarItemProps } from "@nivo/bar";
import { MUIDataTableOptions, MUIDataTableColumnDef } from "mui-datatables";
import { Tooltip } from "@material-ui/core";
import { MoreActions } from "app/components/Charts/table/common/toolbar/MoreButton";
import get from "lodash/get";
import React from "react";

export interface BarChartProps {
  data: any;
  height?: number;
  onZoomOut: () => void;
  vizCompData: BarItemProps[];
  setVizCompData: React.Dispatch<React.SetStateAction<BarItemProps[]>>;
  selectedVizItemId: string | number | null;
  setSelectedVizItem: (name: string | number | null) => void;
  onSelectChange: (e: {
    selection: string | number | null;
    translation: { x: number; y: number };
  }) => void;
  hideODAGNI?: boolean;
}

export interface SimpleBarChartProps {
  data: any;
}

export interface BarNodeProps extends BarItemProps {
  hoveredXIndex: number | null;
  setHoveredXIndex: React.Dispatch<React.SetStateAction<number | null>>;
  selected: BarExtendedDatum | null;
  setSelected: (b: BarExtendedDatum | null) => void;
  onNodeClick: (e: {
    selection: string | number | null;
    translation: { x: number; y: number };
  }) => void;
  onZoomOut: () => void;
}

export const barMockData = [
  {
    year: 1993,
    exclusive: 0,
    exclusiveColor: "#ACD1D1",
    other: 206740,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 1996,
    exclusive: 0,
    exclusiveColor: "#ACD1D1",
    other: 513131,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 1998,
    exclusive: 6289000,
    exclusiveColor: "#ACD1D1",
    other: 5335977,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 1999,
    exclusive: 3137569.43,
    exclusiveColor: "#ACD1D1",
    other: 9498969.030000001,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2000,
    exclusive: 0,
    exclusiveColor: "#ACD1D1",
    other: 44516481.85,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2001,
    exclusive: 26353345.869999997,
    exclusiveColor: "#ACD1D1",
    other: 145889295.45,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2002,
    exclusive: 3158.61,
    exclusiveColor: "#ACD1D1",
    other: 7623641.140000001,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2003,
    exclusive: 44413378.39,
    exclusiveColor: "#ACD1D1",
    other: 369557203.9200001,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2004,
    exclusive: 25987000.48,
    exclusiveColor: "#ACD1D1",
    other: 368874336.00999993,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2005,
    exclusive: 3645000,
    exclusiveColor: "#ACD1D1",
    other: 186950384.49,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2006,
    exclusive: 25448868.55,
    exclusiveColor: "#ACD1D1",
    other: 418289877.08,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2007,
    exclusive: 9643986.09,
    exclusiveColor: "#ACD1D1",
    other: 288713104.84,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2008,
    exclusive: 18450.57,
    exclusiveColor: "#ACD1D1",
    other: 173744885.41000003,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2009,
    exclusive: 1506066.9100000001,
    exclusiveColor: "#ACD1D1",
    other: 390628493.50999993,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2010,
    exclusive: 31559159.57,
    exclusiveColor: "#ACD1D1",
    other: 787388882.9299998,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2011,
    exclusive: 9683589.760000002,
    exclusiveColor: "#ACD1D1",
    other: 672421720.0899998,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2012,
    exclusive: 40148608.559999995,
    exclusiveColor: "#ACD1D1",
    other: 409485316.06000006,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2013,
    exclusive: 135504510.59,
    exclusiveColor: "#ACD1D1",
    other: 1402575353.78,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2014,
    exclusive: 17629572.58,
    exclusiveColor: "#ACD1D1",
    other: 571436824.24,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2015,
    exclusive: 38292135.55,
    exclusiveColor: "#ACD1D1",
    other: 274391032,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2016,
    exclusive: 44071851.989999995,
    exclusiveColor: "#ACD1D1",
    other: 453564300.47,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2017,
    exclusive: 22490662.22,
    exclusiveColor: "#ACD1D1",
    other: 275731039.7299999,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2018,
    exclusive: 50505234.94,
    exclusiveColor: "#ACD1D1",
    other: 183420568.62,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2019,
    exclusive: 40798302.9,
    exclusiveColor: "#ACD1D1",
    other: 101541645.39999998,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2020,
    exclusive: 116596786.27,
    exclusiveColor: "#ACD1D1",
    other: 20258835.999999985,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2021,
    exclusive: 0,
    exclusiveColor: "#ACD1D1",
    other: 112231,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2022,
    exclusive: 0,
    exclusiveColor: "#ACD1D1",
    other: 63924,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2023,
    exclusive: 0,
    exclusiveColor: "#ACD1D1",
    other: 62797,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2024,
    exclusive: 0,
    exclusiveColor: "#ACD1D1",
    other: 183037,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
  {
    year: 2025,
    exclusive: 0,
    exclusiveColor: "#ACD1D1",
    other: 170333,
    otherColor: "#7491CE",
    gni: 0,
    gniColor: "#AE4764",
  },
];

export const simplebarMockData = [
  {
    line: "Multilateral development cooperation",
    value: 10000000,
    valueColor: "#8AA4DB",
  },
  {
    line: "Country-specific and regional development",
    value: 5500000,
    valueColor: "#AE4764",
  },
  {
    line: "European Development Fund",
    value: 4700000,
    valueColor: "#2E4982",
  },
  {
    line: "Non-country specific development cooperation",
    value: 6000000,
    valueColor: "#425346",
  },
  {
    line: "Humanitarian assistance",
    value: 7000000,
    valueColor: "#233C71",
  },
  {
    line: "Planning, support functions and communication",
    value: 4500000,
    valueColor: "#E7C3CD",
  },
  {
    line: "Evaluation and internal audit",
    value: 8500000,
    valueColor: "#819DAB",
  },
  {
    line: "Support conducted by civil society organisations",
    value: 7000000,
    valueColor: "#ACD1D1",
  },
  {
    line: "Concessional credits",
    value: 8700000,
    valueColor: "#DA8E68",
  },
];

export const budgetLineKeys = [
  "Multilateral development cooperation",
  "Country-specific and regional development",
  "European Development Fund",
  "Non-country specific development cooperation",
  "Humanitarian assistance",
  "Planning, support functions and communication",
  "Evaluation and internal audit",
  "Support conducted by civil society organisations",
  "Concessional credits",
];

export const budgetLinesMockData = [
  {
    year: 1998,
    "Support conducted by civil society organisations": 6289000,
    "Support conducted by civil society organisationsColor": "#ACD1D1",
  },
  {
    year: 1999,
    "Support conducted by civil society organisations": 3015000,
    "Support conducted by civil society organisationsColor": "#ACD1D1",
    "Country-specific and regional development": 122569.43,
    "Country-specific and regional developmentColor": "#AE4764",
  },
  {
    year: 2001,
    "Planning, support functions and communication": 715000,
    "Planning, support functions and communicationColor": "#E7C3CD",
    "Support conducted by civil society organisations": 23610000,
    "Support conducted by civil society organisationsColor": "#ACD1D1",
    "Country-specific and regional development": 28345.87,
    "Country-specific and regional developmentColor": "#AE4764",
    "Multilateral development cooperation": 2000000,
    "Multilateral development cooperationColor": "#8AA4DB",
  },
  {
    year: 2002,
    "Country-specific and regional development": 3158.61,
    "Country-specific and regional developmentColor": "#AE4764",
  },
  {
    year: 2003,
    "Support conducted by civil society organisations": 3936000,
    "Support conducted by civil society organisationsColor": "#ACD1D1",
    "Non-country specific development cooperation": 400000,
    "Non-country specific development cooperationColor": "#425346",
    "Multilateral development cooperation": 40000000,
    "Multilateral development cooperationColor": "#8AA4DB",
    "Country-specific and regional development": 11414.6,
    "Country-specific and regional developmentColor": "#AE4764",
    "Concessional credits": 65963.79,
    "Concessional creditsColor": "#DA8E68",
  },
  {
    year: 2004,
    "Humanitarian assistance": 9500000,
    "Humanitarian assistanceColor": "#233C71",
    "Non-country specific development cooperation": 149678.83,
    "Non-country specific development cooperationColor": "#425346",
    "Multilateral development cooperation": 5000000,
    "Multilateral development cooperationColor": "#8AA4DB",
    "Evaluation and internal audit": 256731.96,
    "Evaluation and internal auditColor": "#819DAB",
    "Planning, support functions and communication": 538873.82,
    "Planning, support functions and communicationColor": "#E7C3CD",
    "Country-specific and regional development": 10541715.87,
    "Country-specific and regional developmentColor": "#AE4764",
  },
  {
    year: 2005,
    "Support conducted by civil society organisations": 3645000,
    "Support conducted by civil society organisationsColor": "#ACD1D1",
  },
  {
    year: 2006,
    "Non-country specific development cooperation": 200000,
    "Non-country specific development cooperationColor": "#425346",
    "Multilateral development cooperation": 8318298.55,
    "Multilateral development cooperationColor": "#8AA4DB",
    "Support conducted by civil society organisations": 3565000,
    "Support conducted by civil society organisationsColor": "#ACD1D1",
    "Humanitarian assistance": 13365570,
    "Humanitarian assistanceColor": "#233C71",
  },
  {
    year: 2007,
    "Multilateral development cooperation": 1710012.2,
    "Multilateral development cooperationColor": "#8AA4DB",
    "Concessional credits": 274716.9,
    "Concessional creditsColor": "#DA8E68",
    "Planning, support functions and communication": 467336.99,
    "Planning, support functions and communicationColor": "#E7C3CD",
    "Support conducted by civil society organisations": 7191920,
    "Support conducted by civil society organisationsColor": "#ACD1D1",
  },
  {
    year: 2008,
    "Concessional credits": 18450.57,
    "Concessional creditsColor": "#DA8E68",
  },
  {
    year: 2009,
    "Planning, support functions and communication": 140983.78,
    "Planning, support functions and communicationColor": "#E7C3CD",
    "Concessional credits": 287192.25,
    "Concessional creditsColor": "#DA8E68",
    "Country-specific and regional development": 1077890.88,
    "Country-specific and regional developmentColor": "#AE4764",
  },
  {
    year: 2010,
    "Country-specific and regional development": 2824192.02,
    "Country-specific and regional developmentColor": "#AE4764",
    "Non-country specific development cooperation": 410000,
    "Non-country specific development cooperationColor": "#425346",
    "Concessional credits": 97036.01000000001,
    "Concessional creditsColor": "#DA8E68",
    "Planning, support functions and communication": 108143.54000000001,
    "Planning, support functions and communicationColor": "#E7C3CD",
    "Multilateral development cooperation": 26304295,
    "Multilateral development cooperationColor": "#8AA4DB",
    "Support conducted by civil society organisations": 1815493,
    "Support conducted by civil society organisationsColor": "#ACD1D1",
  },
  {
    year: 2011,
    "Country-specific and regional development": 4695.76,
    "Country-specific and regional developmentColor": "#AE4764",
    "Multilateral development cooperation": 8895894,
    "Multilateral development cooperationColor": "#8AA4DB",
    "Support conducted by civil society organisations": 783000,
    "Support conducted by civil society organisationsColor": "#ACD1D1",
  },
  {
    year: 2012,
    "European Development Fund": 4410000,
    "European Development FundColor": "#2E4982",
    "Multilateral development cooperation": 33960000,
    "Multilateral development cooperationColor": "#8AA4DB",
    "Non-country specific development cooperation": 398000,
    "Non-country specific development cooperationColor": "#425346",
    "Concessional credits": 738161.7699999999,
    "Concessional creditsColor": "#DA8E68",
    "Support conducted by civil society organisations": 408477,
    "Support conducted by civil society organisationsColor": "#ACD1D1",
    "Planning, support functions and communication": 220000,
    "Planning, support functions and communicationColor": "#E7C3CD",
    "Country-specific and regional development": 13969.79,
    "Country-specific and regional developmentColor": "#AE4764",
  },
  {
    year: 2013,
    "Non-country specific development cooperation": 6485639.27,
    "Non-country specific development cooperationColor": "#425346",
    "Country-specific and regional development": 1859515.26,
    "Country-specific and regional developmentColor": "#AE4764",
    "Multilateral development cooperation": 56500000,
    "Multilateral development cooperationColor": "#8AA4DB",
    "Support conducted by civil society organisations": 4235000,
    "Support conducted by civil society organisationsColor": "#ACD1D1",
    "European Development Fund": 66424356.06,
    "European Development FundColor": "#2E4982",
  },
  {
    year: 2014,
    "Non-country specific development cooperation": 3096446.87,
    "Non-country specific development cooperationColor": "#425346",
    "Multilateral development cooperation": 476327,
    "Multilateral development cooperationColor": "#8AA4DB",
    "Country-specific and regional development": 13277488.219999999,
    "Country-specific and regional developmentColor": "#AE4764",
    "Support conducted by civil society organisations": 499755,
    "Support conducted by civil society organisationsColor": "#ACD1D1",
    "Concessional credits": 279555.49,
    "Concessional creditsColor": "#DA8E68",
  },
  {
    year: 2015,
    "Multilateral development cooperation": 200000,
    "Multilateral development cooperationColor": "#8AA4DB",
    "Non-country specific development cooperation": 479518.12,
    "Non-country specific development cooperationColor": "#425346",
    "Planning, support functions and communication": 104804,
    "Planning, support functions and communicationColor": "#E7C3CD",
    "Country-specific and regional development": 31433861.740000002,
    "Country-specific and regional developmentColor": "#AE4764",
    "Support conducted by civil society organisations": 5988080,
    "Support conducted by civil society organisationsColor": "#ACD1D1",
    "Evaluation and internal audit": 85871.69,
    "Evaluation and internal auditColor": "#819DAB",
  },
  {
    year: 2016,
    "Multilateral development cooperation": 12981750,
    "Multilateral development cooperationColor": "#8AA4DB",
    "Support conducted by civil society organisations": 1592454,
    "Support conducted by civil society organisationsColor": "#ACD1D1",
    "Non-country specific development cooperation": 3370000,
    "Non-country specific development cooperationColor": "#425346",
    "Planning, support functions and communication": 2026237.47,
    "Planning, support functions and communicationColor": "#E7C3CD",
    "Country-specific and regional development": 24101410.52,
    "Country-specific and regional developmentColor": "#AE4764",
  },
  {
    year: 2017,
    "Non-country specific development cooperation": 2019998,
    "Non-country specific development cooperationColor": "#425346",
    "Multilateral development cooperation": 1853203.11,
    "Multilateral development cooperationColor": "#8AA4DB",
    "Country-specific and regional development": 15977461.11,
    "Country-specific and regional developmentColor": "#AE4764",
    "Support conducted by civil society organisations": 140000,
    "Support conducted by civil society organisationsColor": "#ACD1D1",
    "Humanitarian assistance": 2500000,
    "Humanitarian assistanceColor": "#233C71",
  },
  {
    year: 2018,
    "Humanitarian assistance": 12000000,
    "Humanitarian assistanceColor": "#233C71",
    "Support conducted by civil society organisations": 3010818,
    "Support conducted by civil society organisationsColor": "#ACD1D1",
    "Non-country specific development cooperation": 744617,
    "Non-country specific development cooperationColor": "#425346",
    "Multilateral development cooperation": 12690000,
    "Multilateral development cooperationColor": "#8AA4DB",
    "Country-specific and regional development": 22059799.94,
    "Country-specific and regional developmentColor": "#AE4764",
  },
  {
    year: 2019,
    "Support conducted by civil society organisations": 5011370,
    "Support conducted by civil society organisationsColor": "#ACD1D1",
    "Humanitarian assistance": 9000596.57,
    "Humanitarian assistanceColor": "#233C71",
    "Multilateral development cooperation": 800001,
    "Multilateral development cooperationColor": "#8AA4DB",
    "Non-country specific development cooperation": 2789546.33,
    "Non-country specific development cooperationColor": "#425346",
    "Country-specific and regional development": 23196789,
    "Country-specific and regional developmentColor": "#AE4764",
  },
  {
    year: 2020,
    "Multilateral development cooperation": 20480000,
    "Multilateral development cooperationColor": "#8AA4DB",
    "Humanitarian assistance": 66374430,
    "Humanitarian assistanceColor": "#233C71",
    "Support conducted by civil society organisations": 88858,
    "Support conducted by civil society organisationsColor": "#ACD1D1",
    "Evaluation and internal audit": 424440,
    "Evaluation and internal auditColor": "#819DAB",
    "Non-country specific development cooperation": 11695424.84,
    "Non-country specific development cooperationColor": "#425346",
    "Country-specific and regional development": 17533633.43,
    "Country-specific and regional developmentColor": "#AE4764",
  },
];

export const ODADataTableColumns: MUIDataTableColumnDef[] = [
  {
    name: "year",
    label: "Year",
    options: {
      setCellProps: () => ({ style: { minWidth: "120px", maxWidth: "150px" } }),
    },
  },
  {
    name: "exclusive",
    label: "Exclusive ODA",
    options: {
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return formatLocale(value);
      },
    },
  },
  {
    name: "other",
    label: "Other ODA",
    options: {
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return formatLocale(value);
      },
    },
  },
  {
    name: "gni",
    label: "ODA/GNI",
    options: {
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return `${value}%`;
      },
    },
  },
];

export const MoreButton = (props: any) => {
  return (
    <Tooltip disableFocusListener title="More Options">
      <MoreActions data={props.data} viz={get(props.params, "tab", "")} />
    </Tooltip>
  );
};

// @ts-ignore
export const getODADataTableOptions: MUIDataTableOptions = (
  params: any,
  data: any
) => {
  return {
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
    customToolbar: () => <MoreButton data={data} params={params} />,
  };
};

export const ODAbudgetLinesDataTableColumns: MUIDataTableColumnDef[] = [
  {
    name: "year",
    label: "Year",
  },
  {
    name: "line",
    label: "Budget line",
  },
  {
    name: "value",
    label: "Disbursements",
    options: {
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return formatLocale(value);
      },
    },
  },
];

// @ts-ignore
export const getODAbudgetLinesDataTableOptions: MUIDataTableOptions = (
  params: any
) => {
  return {
    print: false,
    elevation: 0,
    search: true,
    filter: false,
    download: false,
    rowHover: false,
    pagination: false,
    viewColumns: false,
    responsive: "standard",
    selectableRows: "none",
    selectableRowsHeader: false,
  };
};
