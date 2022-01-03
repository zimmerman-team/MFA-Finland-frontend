import React from "react";
import { useRecoilState } from "recoil";
import Grid from "@material-ui/core/Grid";
import { languageAtom } from "app/state/recoil/atoms";
import { SDGvizItem } from "app/components/Charts/sdg/common/item";
import { SDGTooltip } from "app/components/Charts/sdg/common/tooltip";
import { SDGvizProps, SDGvizItemProps } from "app/components/Charts/sdg/data";

export function getName(
  currentLanguage: string
): "name" | "name_fi" | "name_se" {
  if (currentLanguage === "se") return "name_se";
  if (currentLanguage === "fi") return "name_fi";
  if (currentLanguage === "en") return "name";
  return "name";
}

export function SDGviz(props: SDGvizProps) {
  const [hoveredNode, setHoveredNode] = React.useState<SDGvizItemProps | null>(
    null
  );
  const [localizedData, setLocalizedData] = React.useState(props.data);
  const [currentLanguage] = useRecoilState(languageAtom);

  return (
    <Grid item container spacing={2}>
      {localizedData.map((d: SDGvizItemProps) => (
        <Grid item key={d.number} xs={3} sm={2} md={2} lg={2} xl={2}>
          <SDGvizItem {...d} setHoveredNode={setHoveredNode} />
        </Grid>
      ))}
      <SDGTooltip
        containerId={props.containerId}
        hoveredNode={
          hoveredNode
            ? {
                // @ts-ignore
                title: hoveredNode[getName(currentLanguage)],
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
