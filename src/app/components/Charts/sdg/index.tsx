import React from "react";
import Grid from "@material-ui/core/Grid";
import { SDGvizItem } from "app/components/Charts/sdg/common/item";
import { SDGvizProps, SDGvizItemProps } from "app/components/Charts/sdg/data";
import { SunburstTooltip } from "app/components/Charts/sunburst/common/tooltip";

export function SDGviz(props: SDGvizProps) {
  const [hoveredNode, setHoveredNode] = React.useState<SDGvizItemProps | null>(
    null
  );

  return (
    <Grid container spacing={2} id="sdg-container" css="position: relative;">
      {props.data.map((d: SDGvizItemProps) => (
        <Grid item key={d.number} xs={4} sm={3} md={4} lg={2} xl={2}>
          <SDGvizItem {...d} setHoveredNode={setHoveredNode} />
        </Grid>
      ))}
      <SunburstTooltip
        containerId="sdg-container"
        hoveredNode={
          hoveredNode
            ? {
                title: hoveredNode.name,
                disbursed: hoveredNode.disbursed,
                committed: hoveredNode.committed,
                percentage:
                  (hoveredNode.disbursed / hoveredNode.committed) * 100,
              }
            : null
        }
      />
    </Grid>
  );
}
