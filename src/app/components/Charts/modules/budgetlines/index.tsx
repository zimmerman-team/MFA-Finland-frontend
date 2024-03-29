import React from "react";
import get from "lodash/get";
import sumBy from "lodash/sumBy";
import filter from "lodash/filter";
import { useRouteMatch } from "react-router-dom";
import { SectorsDataTableOptions } from "app/components/Charts/table/data";
import { BudgetLinesBarChart } from "app/components/Charts/bar/variations/budgetlines";
import { BudgetLinesFragmentTable } from "app/components/Charts/table/modules/budgetlines";
import {
  MoreButton,
  BarChartProps,
  ODAbudgetLinesDataTableColumns,
} from "app/components/Charts/bar/data";
import { useCMSData } from "app/hooks/useCMSData";
import { getTranslatedCols } from "../../table/utils/getTranslatedCols";

interface BudgetLinesModuleModel extends BarChartProps {
  activeTab: string;
  scrollableHeight: number;
  getActiveTabData: () => any;
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

export function formatDataForViz(data: any, currentLanguage: string) {
  return data.map((d: any) => {
    let lineKeys = filter(
      Object.keys(d),
      (key: string) =>
        key.indexOf("Color") === -1 &&
        key.indexOf("Code") === -1 &&
        key !== "year"
    );
    if (currentLanguage === "en") {
      lineKeys = filter(
        lineKeys,
        (key: string) => key.indexOf("_fi") === -1 && key.indexOf("_se") === -1
      );
    } else {
      lineKeys = filter(
        lineKeys,
        (key: string) => key.indexOf(`_${currentLanguage}`) !== -1
      );
    }
    let item = {
      year: d.year,
    };
    lineKeys.forEach((key: string) => {
      const dataKey = key.replace(`_${currentLanguage}`, "");
      item = {
        ...item,
        [dataKey]: d[key],
        [`${dataKey}Code`]: d[`${dataKey}Code`],
        [`${dataKey}Color`]: d[`${dataKey}Color`],
      };
    });
    return item;
  });
}

export function BudgetLinesModule(props: BudgetLinesModuleModel) {
  const cmsData = useCMSData({ returnData: true });
  const { params } = useRouteMatch();

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

        @media (max-width: 600px) {
          max-height: 100%;
          padding: 0;
        }
      `}
    >
      <BudgetLinesFragmentTable
        csvData={props.data}
        data={formatDataForTable(props.data)}
        options={{
          ...SectorsDataTableOptions,
          customToolbar: () => (
            <MoreButton data={props.getActiveTabData()} params={params} />
          ),
        }}
        title={`${props.data.length} ${get(
          cmsData,
          "viz.budgetlineyears",
          "budget line years"
        )}`}
        columns={getTranslatedCols(ODAbudgetLinesDataTableColumns, cmsData)}
      />
    </div>
  );
}
