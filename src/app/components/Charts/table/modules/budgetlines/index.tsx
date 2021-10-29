import React from "react";
import find from "lodash/find";
import filter from "lodash/filter";
import { Tooltip } from "@material-ui/core";
import { DataTable } from "app/components/Charts/table";
import { MUIDataTableIsRowCheck } from "mui-datatables";
import { DataTableProps } from "app/components/Charts/table/data";
import { MoreActions } from "app/components/Charts/table/common/toolbar/MoreButton";
import { ExpandableRows } from "app/components/Charts/table/common/rows/ExpandableRows";

interface BudgetLinesFragmentTableProps extends DataTableProps {
  csvData: any;
}

export function BudgetLinesFragmentTable(props: BudgetLinesFragmentTableProps) {
  const [shownData, setShownData] = React.useState<
    Array<object | number[] | string[]>
  >([]);

  function onSearchChange(value: string | null) {
    if (value) {
      const fvalue = value.toLowerCase();
      setShownData(
        filter(props.data, (td: any) => {
          const year = td.year.toLowerCase().indexOf(fvalue) > -1;
          if (year) {
            return true;
          }
          if (td.orgs) {
            const lvl2 = find(td.lines, (child: any) => {
              const lvl2child = child.line.toLowerCase().indexOf(fvalue) > -1;
              if (lvl2child) {
                return true;
              }
              return false;
            });
            if (lvl2) {
              return true;
            }
          }
          return false;
        }) as never[]
      );
    } else {
      setShownData(props.data);
    }
  }

  React.useEffect(() => setShownData(props.data), [props.data]);

  const MoreButton = () => (
    <Tooltip disableFocusListener title="More Options">
      <MoreActions data={props.csvData} viz="budget-lines" />
    </Tooltip>
  );

  return (
    <DataTable
      data={shownData}
      title={props.title}
      columns={props.columns}
      options={{
        ...props.options,
        count: shownData.length,
        customToolbar: MoreButton,
        // onDownload: () => {
        //   let filters = getAPIFormattedFilters(selectedFilters);
        //   if (
        //     !find(Object.keys(filters), (key: string) => key === "sector_code")
        //   ) {
        //     filters = {
        //       ...filters,
        //       sector_code: ["*"],
        //     };
        //   }
        //   downloadActivitiesCSV(
        //     ...filters,
        //     "",
        //     "",
        //     props.tableCount,
        //     props.pageParam,
        //     () => null
        //   );
        //   return false;
        // },
        onSearchChange,
        isRowExpandable: (
          dataIndex: number,
          expandedRows?: MUIDataTableIsRowCheck
        ) => {
          // @ts-ignore
          return shownData[dataIndex].lines;
        },
        renderExpandableRow: (
          rowData: string[],
          rowMeta: { dataIndex: number; rowIndex: number }
        ) => {
          // @ts-ignore
          const childData = shownData[rowMeta.rowIndex].lines;
          if (childData) {
            return (
              <ExpandableRows
                level={1}
                data={childData}
                type="budgetlines"
                key={rowMeta.dataIndex}
              />
            );
          }
        },
      }}
    />
  );
}
