import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import filter from "lodash/filter";
import { useCMSData } from "app/hooks/useCMSData";
import { DataTable } from "app/components/Charts/table";
import { MUIDataTableIsRowCheck } from "mui-datatables";
import { MoreButton } from "app/components/Charts/bar/data";
import { ExpandableRows } from "app/components/Charts/table/common/rows/ExpandableRows";
import {
  DataTableProps,
  SectorsDataTableOptions,
} from "app/components/Charts/table/data";

export function SectorsFragmentTable(props: DataTableProps) {
  const cmsData = useCMSData({ returnData: true });
  const [shownData, setShownData] = React.useState<
    Array<object | number[] | string[]>
  >([]);

  function onSearchChange(value: string | null) {
    if (value) {
      const fvalue = value.toLowerCase();
      setShownData(
        filter(props.data, (td: any) => {
          const sectorCat =
            td.code.toLowerCase().indexOf(fvalue) > -1 ||
            td.title.toLowerCase().indexOf(fvalue) > -1;
          if (sectorCat) {
            return true;
          }
          if (td.children) {
            const dac3 = find(td.children, (child: any) => {
              const dac3child =
                child.code.toLowerCase().indexOf(fvalue) > -1 ||
                child.title.toLowerCase().indexOf(fvalue) > -1;
              if (dac3child) {
                return true;
              }
              if (child.children) {
                return find(
                  child.children,
                  (gchild: any) =>
                    gchild.code.toLowerCase().indexOf(fvalue) > -1 ||
                    gchild.title.toLowerCase().indexOf(fvalue) > -1
                );
              }
              return false;
            });
            if (dac3) {
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

  return (
    <DataTable
      data={shownData}
      columns={props.columns}
      options={{
        ...SectorsDataTableOptions,
        count: shownData.length,
        customToolbar: () => (
          <MoreButton
            data={{
              children: props.data,
            }}
            params={{ tab: "sectors" }}
          />
        ),
        onSearchChange,
        isRowExpandable: (
          dataIndex: number,
          expandedRows?: MUIDataTableIsRowCheck
        ) => {
          // @ts-ignore
          return shownData[dataIndex].children;
        },
        renderExpandableRow: (
          rowData: string[],
          rowMeta: { dataIndex: number; rowIndex: number }
        ) => {
          // @ts-ignore
          const childData = shownData[rowMeta.rowIndex].children;
          if (childData) {
            return (
              <ExpandableRows
                level={1}
                data={childData}
                key={rowMeta.dataIndex}
              />
            );
          }
        },
      }}
      title={`${props.data.length} ${get(
        cmsData,
        "general.sectors",
        "sectors"
      ).toLowerCase()}`}
    />
  );
}
