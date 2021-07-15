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
  const [hoveredNode, setHoveredNode] = React.useState<SunburstPoint | null>(
    null
  );
  const [clickedNode, setClickedNode] = React.useState<SunburstPoint | null>(
    null
  );
  const cmsData = useCMSData({ returnData: true });

  return (
    <React.Fragment>
      <Sunburst
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
          setClickedNode(node);
          setHoveredNode(null);
        }}
        onValueMouseOver={(
          node: SunburstPoint,
          event: React.MouseEvent<HTMLElement>
        ) => {
          setHoveredNode(node);
        }}
        onValueMouseOut={() => {
          if (!("ontouchstart" in document.documentElement)) {
            setHoveredNode(null);
          }
        }}
      >
        <SunburstTooltip showOnlyTitle hoveredNode={hoveredNode} />
      </Sunburst>
      {clickedNode && (
        <SmTooltipContainer
          cmsData={cmsData}
          detailBtnLabel={`${get(cmsData, "viz.sector", "Sector")} ${get(
            cmsData,
            "viz.detail",
            "detail"
          )}`}
          close={() => setClickedNode(null)}
          showDrilldownBtn={
            clickedNode !== undefined && clickedNode._children !== undefined
          }
          gotoDetail={() =>
            history.push(
              `/sectors/${clickedNode.code}${history.location.search}`
            )
          }
          drilldown={() => {
            props.setSelected(clickedNode);
            props.setSelectedCount(getTotal(clickedNode));
            setClickedNode(null);
          }}
        >
          <SunburstTooltipContent hoveredNode={clickedNode} />
        </SmTooltipContainer>
      )}
    </React.Fragment>
  );
}
