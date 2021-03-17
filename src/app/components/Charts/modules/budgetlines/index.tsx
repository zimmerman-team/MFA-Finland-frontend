import React from "react";
import sumBy from "lodash/sumBy";
import filter from "lodash/filter";
import { SectorsDataTableOptions } from "app/components/Charts/table/data";
import { BudgetLinesBarChart } from "app/components/Charts/bar/variations/budgetlines";
import { BudgetLinesFragmentTable } from "app/components/Charts/table/modules/budgetlines";
import {
  BarChartProps,
  ODAbudgetLinesDataTableColumns,
} from "app/components/Charts/bar/data";

interface BudgetLinesModuleModel extends BarChartProps {
  activeTab: string;
  scrollableHeight: number;
}

function formatDataForTable(data: any) {
  return data
    .map((d: any) => {
      const lineKeys = filter(
        Object.keys(d),
        (key: string) =>
          key.indexOf("Color") === -1 &&
          key.indexOf("Code") === -1 &&
          key !== "year"
      );
      const lines = lineKeys.map((key: string) => ({
        line: key,
        value: d[key],
      }));
      return {
        year: d.year,
        value: sumBy(lines, "value"),
        lines,
      };
    })
    .reverse();
}

export function BudgetLinesModule(props: BudgetLinesModuleModel) {
  if (props.activeTab === "chart") {
    return (
      <BudgetLinesBarChart
        onZoomOut={props.onZoomOut}
        vizCompData={props.vizCompData}
        data={props.data}
        setVizCompData={props.setVizCompData}
        onSelectChange={props.onSelectChange}
        selectedVizItemId={props.selectedVizItemId}
        setSelectedVizItem={props.setSelectedVizItem}
      />
    );
  }
  return (
    <div
      css={`
        overflow-y: overlay;
        padding: 24px 24px 24px 0;
        max-height: ${props.scrollableHeight}px;
      `}
    >
      <BudgetLinesFragmentTable
        data={formatDataForTable(props.data)}
        columns={ODAbudgetLinesDataTableColumns}
        options={SectorsDataTableOptions}
        title={`${props.data.length} budget line years`}
      />
    </div>
  );
}
