import React from "react";
import filter from "lodash/filter";
import { DataTable } from "app/components/Charts/table";
import { MUIDataTableIsRowCheck } from "mui-datatables";
import { MoreButton } from "app/components/Charts/bar/data";
import { DataTableProps } from "app/components/Charts/table/data";
import { ExpandableRows } from "app/components/Charts/table/common/rows/ExpandableRows";

interface LocationsFragmentTableProps extends DataTableProps {
  type: string;
}

export function LocationsFragmentTable(props: LocationsFragmentTableProps) {
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
        customToolbar: () => (
          <MoreButton
            data={{
              children: props.data,
            }}
            params={{
              tab:
                props.type === "location"
                  ? "countries-regions"
                  : "organisations",
            }}
          />
        ),
        onSearchChange,
        isRowExpandable: (
          dataIndex: number,
          expandedRows?: MUIDataTableIsRowCheck
        ) => {
          // @ts-ignore
          return shownData[dataIndex].orgs;
        },
        renderExpandableRow: (
          rowData: string[],
          rowMeta: { dataIndex: number; rowIndex: number }
        ) => {
          // @ts-ignore
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
