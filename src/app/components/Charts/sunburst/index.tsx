import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import sumBy from "lodash/sumBy";
import { useRecoilState } from "recoil";
import findIndex from "lodash/findIndex";
import { SunburstPoint } from "react-vis";
import { useWindowSize } from "react-use";
import Grid from "@material-ui/core/Grid";
import { useCMSData } from "app/hooks/useCMSData";
import { languageAtom } from "app/state/recoil/atoms";
import { containercss } from "app/components/Charts/sunburst/styles";
import { SunburstViz } from "app/components/Charts/sunburst/common/viz";
import { SunburstChartProps } from "app/components/Charts/sunburst/data";
import { InnerVizStat } from "app/components/Charts/sunburst/common/innervizstat";
import { backbuttoncss } from "app/components/Charts/sunburst/common/innervizstat/styles";
import {
  getSelectedItemData,
  getTitle,
} from "app/components/Charts/sunburst/utils";

export function SunburstChart(props: SunburstChartProps) {
  const { width } = useWindowSize();
  const cmsData = useCMSData({ returnData: true });
  const [vizSize, setVizSize] = React.useState(340);
  const [selectedCount, setSelectedCount] = React.useState(0);
  const [localData, setLocalData] = React.useState(props.data);
  const [selected, setSelected] = React.useState({ name: "", code: " " });
  const [prevSelections, setPrevSelections] = React.useState<
    { name: string; code: string }[]
  >([]);
  const [currentLanguage] = useRecoilState(languageAtom);

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
    props.setSelectedVizItem(
      prevIndex < 1
        ? null
        : get(prevSelections, `[${prevIndex - 1}].name`, null)
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
      props.setSelectedVizItem(node.title);
    }
  }

  React.useEffect(() => {
    if (props.selectedVizItemId !== selected.name) {
      const fItem = find(localData.children, {
        title: props.selectedVizItemId,
      });
      if (fItem) {
        setPrevSelections([
          ...prevSelections,
          { name: fItem.title, code: fItem.code },
        ]);
        setSelected({
          name: fItem.title,
          code: fItem.code,
        });
      }
    }
  }, [props.selectedVizItemId]);

  React.useLayoutEffect(() => {
    if (width < 992) {
      setVizSize(width * 0.7 - 24);
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
          style: { stroke: "#343249", strokeWidth: 0.5 },
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
      <Grid id="sunburst-back" item xs={12} sm={3} md={2} lg={1}>
        {prevSelections.length > 0 && (
          <div css={backbuttoncss} onClick={goBack}>
            {get(cmsData, "general.back", "Back")}
          </div>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        css={`
          padding-top: 44px;
        `}
      >
        <div
          css={containercss}
          id="sunburst-container"
          style={{
            height: vizSize,
          }}
        >
          <InnerVizStat
            count={selected.name !== "" ? selectedCount : props.activitiesCount}
          />
          <SunburstViz
            size={vizSize}
            setSelected={onArcClick}
            data={normalizeData(localData)}
            setSelectedCount={setSelectedCount}
            onSectorSelectChange={props.onSectorSelectChange}
          />
        </div>
      </Grid>
    </Grid>
  );
}
