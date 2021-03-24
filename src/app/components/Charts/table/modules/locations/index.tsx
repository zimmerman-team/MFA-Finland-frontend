import React from "react";
import filter from "lodash/filter";
// import { useRecoilState } from "recoil";
import { DataTable } from "app/components/Charts/table";
import { MUIDataTableIsRowCheck } from "mui-datatables";
// import { selectedFilterAtom } from "app/state/recoil/atoms";
import { DataTableProps } from "app/components/Charts/table/data";
import { ExpandableRows } from "app/components/Charts/table/common/rows/ExpandableRows";
// import { downloadActivitiesCSV } from "app/utils/downloadActivitiesCSV";
// import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";

interface LocationsFragmentTableProps extends DataTableProps {
  type: string;
}

export function LocationsFragmentTable(props: LocationsFragmentTableProps) {
  //   const [selectedFilters, setSelectedFilters] = useRecoilState(
  //     selectedFilterAtom
  //   );
  const [shownData, setShownData] = React.useState<
    Array<object | number[] | string[]>
  >([]);

  function onSearchChange(value: string | null) {
    if (value) {
      const fvalue = value.toLowerCase();
      const updatedData: any[] = [];
      props.data.forEach((td: any) => {
        const orgCat = td.name.toLowerCase().indexOf(fvalue) > -1;
        if (orgCat) {
          updatedData.push(td);
        } else if (td.orgs) {
          const children = filter(
            td.orgs,
            (child: any) => child.name.toLowerCase().indexOf(fvalue) > -1
          );
          if (children.length > 0) {
            updatedData.push({ ...td, orgs: children });
          }
        }
      });
      setShownData(updatedData);
    } else {
      setShownData(props.data);
    }
  }

  React.useEffect(() => setShownData(props.data), [props.data]);

  return (
    <DataTable
      data={shownData}
      title={props.title}
      columns={props.columns}
      options={{
        ...props.options,
        count: shownData.length,
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
          //@ts-ignore
          return shownData[dataIndex].orgs;
        },
        renderExpandableRow: (
          rowData: string[],
          rowMeta: { dataIndex: number; rowIndex: number }
        ) => {
          //@ts-ignore
          const childData = shownData[rowMeta.rowIndex].orgs;
          if (childData) {
            return (
              <ExpandableRows
                level={1}
                data={childData}
                type={props.type}
                key={rowMeta.dataIndex}
              />
            );
          }
        },
      }}
    />
  );
}
