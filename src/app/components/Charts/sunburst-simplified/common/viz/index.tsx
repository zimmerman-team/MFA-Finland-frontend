import React from "react";
import { useHistory } from "react-router-dom";
import { Sunburst, SunburstPoint } from "react-vis";
import { getTotal } from "app/components/Charts/sunburst/common/tooltip/utils";
import { SmTooltipContainer } from "app/components/Charts/common/smTooltipContainer";
import {
  SunburstTooltip,
  SunburstTooltipContent,
} from "app/components/Charts/sunburst/common/tooltip";
import { useCMSData } from "app/hooks/useCMSData";
import get from "lodash/get";

export function SunburstVizSimplified(props: any) {
  const history = useHistory();
  const cmsData = useCMSData({ returnData: true });

  return (
    <React.Fragment>
      <Sunburst
        data-cy="sunburstVizSimplified"
        hideRootNode
        colorType="literal"
        padAngle={0.02}
        data={props.data}
        width={props.size}
        height={props.size}
        animation={{ damping: 20, stiffness: 300 }}
        style={{
          stroke: "#343249",
          strokeWidth: 0.5,
        }}
        onValueClick={(
          node: SunburstPoint,
          event: React.MouseEvent<HTMLElement>
        ) => {
          props.setClickedNode(node);
          props.setHoveredNode(null);
        }}
        onValueMouseOver={(
          node: SunburstPoint,
          event: React.MouseEvent<HTMLElement>
        ) => {
          props.setHoveredNode(node);
        }}
        onValueMouseOut={() => {
          if (!("ontouchstart" in document.documentElement)) {
            props.setHoveredNode(null);
          }
        }}
      >
        <SunburstTooltip showOnlyTitle hoveredNode={props.hoveredNode} />
      </Sunburst>
      {props.clickedNode && (
        <SmTooltipContainer
          cmsData={cmsData}
          detailBtnLabel={`${get(cmsData, "viz.sector", "Sector")} ${get(
            cmsData,
            "viz.detail",
            "detail"
          )}`}
          close={() => props.setClickedNode(null)}
          showDrilldownBtn={
            props.clickedNode !== undefined &&
            (props.clickedNode._children !== undefined ||
              props.clickedNode.children !== undefined)
          }
          gotoDetail={() =>
            history.push(
              `/sectors/${props.clickedNode.code}${history.location.search}`
            )
          }
          drilldown={() => {
            props.setSelected(props.clickedNode);
            props.setSelectedCount(getTotal(props.clickedNode));
            props.setClickedNode(null);
          }}
        >
          <SunburstTooltipContent hoveredNode={props.clickedNode} />
        </SmTooltipContainer>
      )}
    </React.Fragment>
  );
}
