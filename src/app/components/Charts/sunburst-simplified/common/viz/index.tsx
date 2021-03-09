import React from "react";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { Sunburst, SunburstPoint } from "react-vis";

import { selectedFilterAtom } from "app/state/recoil/atoms";
import { getTotal } from "app/components/Charts/sunburst/common/tooltip/utils";
import { SunburstTooltip } from "app/components/Charts/sunburst/common/tooltip";
import { SmTooltipContainer } from "app/components/Charts/common/smTooltipContainer";

export function SunburstVizSimplified(props: any) {
  const history = useHistory();
  const [selectedFilters, setSelectedFilters] = useRecoilState(
    selectedFilterAtom
  );
  const [hoveredNode, setHoveredNode] = React.useState<SunburstPoint | null>(
    null
  );

  const showSmTooltip = "ontouchstart" in document.documentElement;

  return (
    <React.Fragment>
      <Sunburst
        hideRootNode
        colorType="literal"
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
          close={() => setHoveredNode(null)}
          drilldown={() => {
            props.setSelected(hoveredNode);
            props.setSelectedCount(getTotal(hoveredNode));
            setHoveredNode(null);
          }}
        >
          <SunburstTooltip hoveredNode={hoveredNode} />
        </SmTooltipContainer>
      )}
    </React.Fragment>
  );
}
