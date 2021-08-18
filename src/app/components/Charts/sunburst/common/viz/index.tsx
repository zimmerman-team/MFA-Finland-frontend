import React from "react";
import get from "lodash/get";
import { useHistory } from "react-router-dom";
import { useCMSData } from "app/hooks/useCMSData";
import { Sunburst, SunburstPoint } from "react-vis";
import { getTotal } from "app/components/Charts/sunburst/common/tooltip/utils";
import { SmTooltipContainer } from "app/components/Charts/common/smTooltipContainer";
import {
  SunburstTooltip,
  SunburstTooltipContent,
} from "app/components/Charts/sunburst/common/tooltip";

export function SunburstViz(props: any) {
  const history = useHistory();
  const [hoveredNode, setHoveredNode] = React.useState<SunburstPoint | null>(
    null
  );
  const showSmTooltip = "ontouchstart" in document.documentElement;
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
        getLabel={(d) => d.name}
        style={{
          stroke: "#343249",
          strokeWidth: 0.5,
        }}
        onValueClick={(
          node: SunburstPoint,
          event: React.MouseEvent<HTMLElement>
        ) => {
          if (node._children) {
            props.setSelected(node);
            props.setSelectedCount(node.size);
          } else {
            // props.onSectorSelectChange(node.code);
            history.push(`/sectors/${node.code}`);
          }
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
        {!showSmTooltip && <SunburstTooltip hoveredNode={hoveredNode} />}
      </Sunburst>
      {hoveredNode && showSmTooltip && (
        <SmTooltipContainer
          cmsData={cmsData}
          showDrilldownBtn
          detailBtnLabel={`${get(cmsData, "viz.sector", "Sector")} ${get(
            cmsData,
            "viz.detail",
            "detail"
          )}`}
          close={() => setHoveredNode(null)}
          gotoDetail={() =>
            history.push(
              `/sectors/${hoveredNode.code}${history.location.search}`
            )
          }
          drilldown={() => {
            props.setSelected(hoveredNode);
            props.setSelectedCount(getTotal(hoveredNode));
            setHoveredNode(null);
          }}
        >
          <SunburstTooltipContent hoveredNode={hoveredNode} />
        </SmTooltipContainer>
      )}
    </React.Fragment>
  );
}
