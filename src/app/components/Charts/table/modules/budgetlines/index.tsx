import React from "react";
import find from "lodash/find";
import filter from "lodash/filter";
// import { useRecoilState } from "recoil";
import { DataTable } from "app/components/Charts/table";
import { MUIDataTableIsRowCheck } from "mui-datatables";
// import { selectedFilterAtom } from "app/state/recoil/atoms";
import { DataTableProps } from "app/components/Charts/table/data";
import { ExpandableRows } from "app/components/Charts/table/common/rows/ExpandableRows";
import { MoreHoriz as DownloadIcon, PersonAdd } from "@material-ui/icons";

import ViewColumnIcon from "@material-ui/icons/DynamicFeed";
import FilterIcon from "@material-ui/icons/GroupWork";
import { Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { FloatingButtons } from "app/modules/viz-module/common/FloatingButtons";
import { useRouteMatch } from "react-router-dom";
import get from "lodash/get";
import { MoreActions } from "app/components/Charts/table/common/toolbar/MoreButton";
// import { downloadActivitiesCSV } from "app/utils/downloadActivitiesCSV";
// import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";

export function BudgetLinesFragmentTable(props: DataTableProps) {
  //   const [selectedFilters, setSelectedFilters] = useRecoilState(
  //     selectedFilterAtom
  //   );
  const { params } = useRouteMatch();
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
      <MoreActions data={{}} viz={get(params, "tab", "")} />
      {/* <IconButton onClick={() => alert("clicked")}> */}
      {/*  <PersonAdd /> */}
      {/* </IconButton> */}
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
