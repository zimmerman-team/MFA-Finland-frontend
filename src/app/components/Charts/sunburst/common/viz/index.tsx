import React from "react";
import { useHistory } from "react-router-dom";
import { Sunburst, SunburstPoint } from "react-vis";
import { getTotal } from "app/components/Charts/sunburst/common/tooltip/utils";
import {
  SunburstTooltip,
  SunburstTooltipContent,
} from "app/components/Charts/sunburst/common/tooltip";
import { SmTooltipContainer } from "app/components/Charts/common/smTooltipContainer";

export function SunburstViz(props: any) {
  const history = useHistory();
  const [hoveredNode, setHoveredNode] = React.useState<SunburstPoint | null>(
    null
  );
  const showSmTooltip = "ontouchstart" in document.documentElement;

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
          if (node._children) {
            props.setSelected(node);
            props.setSelectedCount(node.size);
          } else {
            props.onSectorSelectChange(node.code);
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
          showDrilldownBtn
          detailBtnLabel="Sector Detail"
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
