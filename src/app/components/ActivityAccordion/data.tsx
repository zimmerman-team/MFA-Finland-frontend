import React from "react";
import { MUIDataTableOptions, MUIDataTableColumnDef } from "mui-datatables";

export interface ActivityDetailTableDataModel {
  date: string;
  from: string;
  to: string;
  transactiontype: string;
  value: string;
  traceid: string;
  userid: string;
}

function createData(
  date: string,
  from: string,
  to: string,
  transactiontype: string,
  value: string,
  traceid: string
) {
  return {
    date,
    from,
    to,
    transactiontype,
    value,
    traceid,
    userid: "",
  };
}

const rowItem = [
  "01. Jan-2018",
  "France",
  "Netherlands",
  "Pledged",
  "€123,234.00",
  "XM-DAV-7PPR-28317",
];

export const rows = [
  createData(
    rowItem[0],
    rowItem[1],
    rowItem[2],
    rowItem[3],
    rowItem[4],
    rowItem[5]
  ),
  createData(
    rowItem[0],
    rowItem[1],
    rowItem[2],
    rowItem[3],
    rowItem[4],
    rowItem[5]
  ),
  createData(
    rowItem[0],
    rowItem[1],
    rowItem[2],
    rowItem[3],
    rowItem[4],
    rowItem[5]
  ),
  createData(
    rowItem[0],
    rowItem[1],
    rowItem[2],
    rowItem[3],
    rowItem[4],
    rowItem[5]
  ),
  createData(
    rowItem[0],
    rowItem[1],
    rowItem[2],
    rowItem[3],
    rowItem[4],
    rowItem[5]
  ),
  createData(
    rowItem[0],
    rowItem[1],
    rowItem[2],
    rowItem[3],
    rowItem[4],
    rowItem[5]
  ),
];

export const ActivityDetailTableColumns: MUIDataTableColumnDef[] = [
  {
    name: "date",
    label: "Date",
  },
  {
    name: "from",
    label: "From",
  },
  {
    name: "to",
    label: "To",
  },
  {
    name: "transactiontype",
    label: "Transaction Type",
  },
  {
    name: "value",
    label: "Value",
    options: {
      // TODO: currency check EUR and USD
      customBodyRender: (value) => <span>{value}</span>,
    },
  },
  {
    name: "traceid",
    label: "Trace ID.",
  },
];

export const ActivityDetailTableMockData: Array<
  object | number[] | string[]
> = rows;

export const ActivityDetailTableOptions: MUIDataTableOptions = {
  print: true,
  elevation: 0,
  search: true,
  filter: true,
  download: true,
  rowHover: false,
  pagination: true,
  viewColumns: true,
  responsive: "standard",
  selectableRows: "none",
};
