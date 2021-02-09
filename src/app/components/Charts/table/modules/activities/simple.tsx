import React from "react";
import { DataTable } from "app/components/Charts/table";
import {
  SimpleActivitiesDataTableColumns,
  SimpleActivitiesDataTableOptions,
} from "app/components/Charts/table/data";

interface SimpleActivitiesTableModuleModel {
  data: any;
  tableCount: number;
  setTablePage: React.Dispatch<React.SetStateAction<number>>;
  setTableRows: React.Dispatch<React.SetStateAction<number>>;
}

export function SimpleActivitiesTableModule(
  props: SimpleActivitiesTableModuleModel
) {
  return (
    <DataTable
      data={props.data}
      columns={SimpleActivitiesDataTableColumns}
      options={{
        ...SimpleActivitiesDataTableOptions,
        serverSide: true,
        count: props.tableCount,
        onChangePage: props.setTablePage,
        onChangeRowsPerPage: props.setTableRows,
      }}
      title={`${new Intl.NumberFormat("en-US").format(
        props.tableCount
      )} projects`}
    />
  );
}
