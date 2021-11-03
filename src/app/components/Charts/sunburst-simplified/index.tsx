/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import sumBy from "lodash/sumBy";
import findIndex from "lodash/findIndex";
import { SunburstPoint } from "react-vis";

import { SunburstChartProps } from "app/components/Charts/sunburst/data";
import {
  getSelectedItemData,
  getTitle,
} from "app/components/Charts/sunburst/utils";

import { SunburstVizSimplified } from "app/components/Charts/sunburst-simplified/common/viz";
import { InnerVizStatSimplified } from "app/components/Charts/sunburst-simplified/common/innervizstat";
import { containercssSimplified } from "app/components/Charts/sunburst-simplified/styles";
import Grid from "@material-ui/core/Grid";
import { formatMoneyWithPrefix } from "app/utils/formatMoneyWithPrefix";
import { backbuttoncss } from "../sunburst/common/innervizstat/styles";
import { useRecoilState } from "recoil";
import { languageAtom } from "app/state/recoil/atoms";

export function SunburstChartSimplified(props: SunburstChartProps) {
  const [selectedCount, setSelectedCount] = React.useState(0);
  const [localData, setLocalData] = React.useState(props.data);
  const [selected, setSelected] = React.useState({ name: "", code: " " });
  const [prevSelections, setPrevSelections] = React.useState<
    { name: string; code: string }[]
  >([]);
  const [hoveredNode, setHoveredNode] = React.useState<SunburstPoint | null>(
    null
  );
  const [clickedNode, setClickedNode] = React.useState<SunburstPoint | null>(
    null
  );
  const [currentLanguage] = useRecoilState(languageAtom);

  React.useEffect(() => {
    // if (selected.code.length !== 3 || prevSelections.length === 1) {
    setLocalData(getSelectedItemData(selected.name, props.data));
    // }
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
        { name: node[getTitle(currentLanguage)], code: node.code },
      ]);
      setSelected({ name: node[getTitle(currentLanguage)], code: node.code });
      props.setSelectedVizItem(node[getTitle(currentLanguage)]);
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
          { name: fItem[getTitle(currentLanguage)], code: fItem.code },
        ]);
        setSelected({
          name: fItem[getTitle(currentLanguage)],
          code: fItem.code,
        });
      }
    }
  }, [props.selectedVizItemId]);

  function normalizeData(data: any) {
    return {
      title: "activities",
      color: "",
      children: data.children.map((child: any) => {
        let updChild: any = {
          code: child.code,
          title: child[getTitle(currentLanguage)],
          color: child.color,
          disbursed: child.size,
          committed: child.committed,
          percentage: child.percentage,
        };
        if (child.children) {
          if (
            selected.code.length === 3 &&
            prevSelections.length > 0 &&
            child[getTitle(currentLanguage)] === selected.name
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

  function getTotal() {
    let total = 0;
    localData.children.map((item: any) => {
      total += item.size;
    });
    return total;
  }

  function getPercentage(item: any) {
    const total = getTotal();
    const percentage = (item.size / total) * 100;
    return Math.round(percentage);
  }

  return (
    <Grid container>
      <Grid id="sunburst-back" item xs={12} sm={3} md={3} lg={3}>
        {prevSelections.length > 0 && (
          <div css={backbuttoncss} onClick={goBack}>
            Back
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
          display: flex;
          max-width: calc(100% + 19px);
        `}
      >
        <div css={containercssSimplified} id="sunburst-container">
          <InnerVizStatSimplified
            count={selected.name !== "" ? selectedCount : props.activitiesCount}
          />
          <SunburstVizSimplified
            size={220}
            setSelected={onArcClick}
            hoveredNode={hoveredNode}
            clickedNode={clickedNode}
            setHoveredNode={setHoveredNode}
            setClickedNode={setClickedNode}
            data={normalizeData(localData)}
            setSelectedCount={setSelectedCount}
            onSectorSelectChange={props.onSectorSelectChange}
          />
        </div>
        {/* LEGEND */}
        <div
          css={`
            display: flex;
            flex-direction: column;
            overflow: auto;
            margin-left: 6px;
          `}
        >
          {localData.children
            .map((item: any) => {
              return (
                <div
                  key={item.title}
                  onClick={() => {
                    setClickedNode(item);
                    setHoveredNode(null);
                  }}
                  css={`
                    display: flex;
                    margin-bottom: 6px;
                    flex-direction: column;

                    &:hover {
                      cursor: pointer;
                      > span {
                        text-decoration: underline;
                      }
                    }
                  `}
                >
                  <span
                    css={`
                      ::before {
                        content: "";
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        margin-right: 8px;
                        border-radius: 30px;
                        background: ${item.color};
                        border: 0.5px solid #323232;
                      }
                      min-width: 0;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      overflow: hidden;
                      font-size: 12px;
                    `}
                  >
                    {item[getTitle(currentLanguage)]} <br />
                  </span>
                  <span
                    css={`
                      margin-left: 16px;
                      margin-top: 3px;
                      font-size: 12px;
                    `}
                  >
                    {formatMoneyWithPrefix(item.size)}
                    {` | ${getPercentage(item)}%`}
                  </span>
                </div>
              );
            })
            .sort()}
        </div>
      </Grid>
    </Grid>
  );
}
