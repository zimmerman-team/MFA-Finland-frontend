import React from "react";
import Grid from "@material-ui/core/Grid";
import { SDGvizItem } from "app/components/Charts/sdg/common/item";
import { SDGTooltip } from "app/components/Charts/sdg/common/tooltip";
import { SDGvizProps, SDGvizItemProps } from "app/components/Charts/sdg/data";

export function SDGviz(props: SDGvizProps) {
  const [hoveredNode, setHoveredNode] = React.useState<SDGvizItemProps | null>(
    null
  );

  return (
    <Grid container spacing={2} id="sdg-container">
      {props.data.map((d: SDGvizItemProps) => (
        <Grid item key={d.number} xs={4} sm={3} md={4} lg={2} xl={2}>
          <SDGvizItem {...d} setHoveredNode={setHoveredNode} />
        </Grid>
      ))}
      <SDGTooltip
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
