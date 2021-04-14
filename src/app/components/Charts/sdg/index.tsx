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
    <Grid item container spacing={2}>
      {props.data.map((d: SDGvizItemProps) => (
        <Grid item key={d.number} xs={3} sm={2} md={2} lg={2} xl={2}>
          <SDGvizItem {...d} setHoveredNode={setHoveredNode} />
        </Grid>
      ))}
      <SDGTooltip
        containerId={props.containerId}
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
