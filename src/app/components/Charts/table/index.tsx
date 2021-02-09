import React from "react";
import MUIDataTable from "mui-datatables";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { DataTableProps, tableTheme } from "app/components/Charts/table/data";

export function DataTable(props: DataTableProps) {
  return (
    <MuiThemeProvider theme={tableTheme}>
      <MUIDataTable
        data={props.data}
        title={props.title}
        options={props.options}
        columns={props.columns}
      />
    </MuiThemeProvider>
  );
}
