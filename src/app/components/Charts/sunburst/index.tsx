import React from "react";
import get from "lodash/get";
import sumBy from "lodash/sumBy";
import findIndex from "lodash/findIndex";
import { SunburstPoint } from "react-vis";
import { useWindowSize } from "react-use";
import Grid from "@material-ui/core/Grid";
import { containercss } from "app/components/Charts/sunburst/styles";
import { SunburstViz } from "app/components/Charts/sunburst/common/viz";
import { SunburstChartProps } from "app/components/Charts/sunburst/data";
import { getSelectedItemData } from "app/components/Charts/sunburst/utils";
import { InnerVizStat } from "app/components/Charts/sunburst/common/innervizstat";
import { backbuttoncss } from "app/components/Charts/sunburst/common/innervizstat/styles";

export function SunburstChart(props: SunburstChartProps) {
  const { width } = useWindowSize();
  const [vizSize, setVizSize] = React.useState(600);
  const [selectedCount, setSelectedCount] = React.useState(0);
  const [localData, setLocalData] = React.useState(props.data);
  const [selected, setSelected] = React.useState({ name: "", code: " " });
  const [prevSelections, setPrevSelections] = React.useState<
    { name: string; code: string }[]
  >([]);

  React.useEffect(() => {
    if (selected.code.length !== 3 || prevSelections.length === 1) {
      setLocalData(getSelectedItemData(selected.name, props.data));
    }
  }, [selected, props.data]);

  React.useEffect(() => {
    const prevIndex = findIndex(
      prevSelections,
      (ps: { name: string; code: string }) => ps.name === selected.name
    );
    if (
      prevIndex === 0 &&
      localData &&
      get(localData, "children", []).length > 0
    ) {
      setSelectedCount(get(localData, "size", 0));
    }
  }, [localData]);

  function goBack() {
    const prevIndex = findIndex(
      prevSelections,
      (ps: { name: string; code: string }) => ps.name === selected.name
    );
    setSelected(
      prevIndex < 1 ? { name: "", code: "" } : prevSelections[prevIndex - 1]
    );
    const updatedPrevSelections = [...prevSelections];
    updatedPrevSelections.pop();
    setPrevSelections(updatedPrevSelections);
  }

  function onArcClick(node: SunburstPoint) {
    if (node.name !== selected.name) {
      setPrevSelections([
        ...prevSelections,
        { name: node.title, code: node.code },
      ]);
      setSelected({ name: node.title, code: node.code });
    }
  }

  React.useLayoutEffect(() => {
    if (width < 600) {
      setVizSize(width - 24);
    }
  }, [width]);

  function normalizeData(data: any) {
    return {
      title: "activities",
      color: "",
      children: data.children.map((child: any) => {
        let updChild: any = {
          code: child.code,
          title: child.title,
          color: child.color,
          disbursed: child.size,
          committed: child.committed,
          percentage: child.percentage,
        };
        if (child.children) {
          if (
            selected.code.length === 3 &&
            prevSelections.length > 0 &&
            child.title === selected.name
          ) {
            updChild = {
              ...updChild,
              children: child.children,
            };
          } else {
            updChild = {
              ...updChild,
              _children: child.children,
              size: sumBy(child.children, "size"),
            };
          }
        } else {
          updChild = {
            ...updChild,
            size: child.size,
          };
        }
        return updChild;
      }),
    };
  }

  return (
    <Grid container>
      <Grid item sm={12} md={2} lg={1}>
        {prevSelections.length > 0 && (
          <div css={backbuttoncss} onClick={goBack}>
            Back
          </div>
        )}
      </Grid>
      <Grid item sm={12} md={12} lg={12}>
        <div
          css={containercss}
          id="sunburst-container"
          style={{ height: vizSize }}
        >
          <InnerVizStat
            count={selected.name !== "" ? selectedCount : props.activitiesCount}
          />
          <SunburstViz
            size={vizSize}
            setSelected={onArcClick}
            data={normalizeData(localData)}
            setSelectedCount={setSelectedCount}
          />
        </div>
      </Grid>
    </Grid>
  );
}