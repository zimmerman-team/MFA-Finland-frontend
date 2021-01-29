import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import { useWindowSize } from "react-use";
import Grid from "@material-ui/core/Grid";
import { css } from "styled-components/macro";
import { useHistory } from "react-router-dom";
import { ResponsiveTreeMapHtml } from "@nivo/treemap";
import { TreemapTooltip } from "app/components/Charts/treemap/common/tooltip";
import {
  TreemapProps,
  TreemapVizModel,
} from "app/components/Charts/treemap/data";
import { backbuttoncss } from "app/components/Charts/sunburst/common/innervizstat/styles";

const containercss = (height?: number) => css`
  height: ${height || 500}px;
  :hover {
    cursor: pointer;
  }
`;

export function Treemap(props: TreemapProps) {
  const { width } = useWindowSize();
  const [drilldownId, setDrilldownId] = React.useState(null);
  const [renderedNodes, setRenderedNodes] = React.useState({ ...props.data });
  const [smTooltip, setSmTooltip] = React.useState(null);
  const history = useHistory();

  const showStandardTooltip =
    !("ontouchstart" in document.documentElement) || width > 767;

  function navigateToDetailPage(node: any) {
    const detailPage = props.label;
    if (node.data.ref) {
      if (detailPage === "Publisher types") {
        history.push(`/publisher/${node.data.ref}/projects`);
      }
      if (detailPage === "Donors") {
        history.push(`/donor/${node.data.ref}/projects`);
      }
      if (detailPage === "Organisations") {
        history.push(`/organisation/${node.data.ref}/projects`);
      }
    }
  }

  function goBack() {
    setDrilldownId(null);
    props.setSelectedVizItem(null);
    setRenderedNodes({ ...props.data });
  }

  function onNodeClick(node: any, e: any, doSmDrilldown?: boolean) {
    if (showStandardTooltip || doSmDrilldown) {
      const children = get(node.data, "orgs", []);
      if (children.length > 0) {
        setRenderedNodes({
          ...renderedNodes,
          children,
        });
        setDrilldownId(node.data.ref);
        props.setSelectedVizItem(node.data.ref);
      } else {
        navigateToDetailPage(node);
      }
    } else {
      setSmTooltip(node);
    }
  }

  React.useEffect(() => {
    if (props.selectedVizItemId !== drilldownId) {
      const fItem = find(renderedNodes.children, {
        ref: props.selectedVizItemId,
      });
      if (fItem) {
        onNodeClick({ data: fItem }, "");
      }
    }
  }, [props.selectedVizItemId]);

  React.useEffect(() => setRenderedNodes({ ...props.data }), [props.data]);

  return (
    <Grid
      container
      spacing={1}
      css={!props.height ? "padding: 50px 10px 0 0;" : ""}
    >
      <Grid item sm={12} md={2} lg={1}>
        {drilldownId && (
          <div css={backbuttoncss} onClick={goBack}>
            Back
          </div>
        )}
      </Grid>
      <Grid item sm={12} md={12} lg={12}>
        <div css={containercss(props.height)}>
          <ResponsiveTreeMapHtml
            data={renderedNodes}
            {...TreemapVizModel}
            onClick={onNodeClick}
            // @ts-ignore
            tooltip={!showStandardTooltip ? () => null : TreemapTooltip}
            theme={{
              ...TreemapVizModel.theme,
              tooltip: {
                ...TreemapVizModel.theme.tooltip,
                container: {
                  ...TreemapVizModel.theme.tooltip.container,
                  display: showStandardTooltip ? "inherit" : "none",
                },
              },
            }}
          />
        </div>
      </Grid>
    </Grid>
  );
}
