import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import { useMeasure } from "react-use";
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
import { TreeemapNode } from "./common/node";
import { SmTooltipContainer } from "../common/smTooltipContainer";

const containercss = (height?: number) => css`
  height: ${height || 500}px;
  :hover {
    cursor: pointer;
  }
`;

export function Treemap(props: TreemapProps) {
  const [drilldownId, setDrilldownId] = React.useState(null);
  const [renderedNodes, setRenderedNodes] = React.useState({ ...props.data });
  const [smTooltip, setSmTooltip] = React.useState(null);
  const history = useHistory();

  const showStandardTooltip = !("ontouchstart" in document.documentElement);

  const [ref, containerSize] = useMeasure<HTMLDivElement>();

  function navigateToDetailPage(node: any) {
    const detailPage = props.label;
    if (node.data.ref) {
      if (detailPage === "locations") {
        if (node.data.ref.length === 2) {
          history.push(`/countries/${node.data.ref}${history.location.search}`);
        } else {
          history.push(`/regions/${node.data.ref}${history.location.search}`);
        }
      }
      if (detailPage === "organisations") {
        history.push(
          `/organisations/${node.data.ref}${history.location.search}`
        );
        if (node.data.ref.length === 2) {
          history.push(
            `/organisation-types/${node.data.ref}${history.location.search}`
          );
        } else {
          history.push(
            `/organisations/${node.data.ref}${history.location.search}`
          );
        }
      }
    }
  }

  function goBack() {
    setDrilldownId(null);
    props.setSelectedVizItem(null);
    setRenderedNodes({ ...props.data });
  }

  function onNodeClick(node: any, e: any, doSmDrilldown?: boolean) {
    if (
      (!props.showSmTooltip || doSmDrilldown) &&
      (showStandardTooltip || doSmDrilldown)
    ) {
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

  function getTooltip() {
    if (props.showSmTooltip) {
      return (e: any) => (
        <div
          css={`
            color: #2e4063;
            font-size: 14px;
          `}
        >
          <b>{e.node.data.name}</b>
        </div>
      );
    }
    if (!showStandardTooltip) {
      return () => null;
    }
    return TreemapTooltip;
  }

  React.useEffect(() => {
    if (props.selectedVizItemId !== drilldownId) {
      const fItem = find(renderedNodes.children, {
        ref: props.selectedVizItemId,
      });
      if (fItem) {
        onNodeClick({ data: fItem }, "", true);
      }
    }
  }, [props.selectedVizItemId]);

  React.useEffect(() => setRenderedNodes({ ...props.data }), [props.data]);

  return (
    <Grid
      container
      spacing={1}
      css={
        !props.height
          ? `
        padding: 32px 104px 0 0;
        @media (max-width: 992px) {
          padding: 32px 12px 0 0;
        }
        @media (max-width: 600px) {
          padding: 0;
          padding-top: 32px;
        }
      `
          : ""
      }
    >
      <Grid item sm={12} md={2} lg={3}>
        {drilldownId && (
          <div css={backbuttoncss} onClick={goBack}>
            Back
          </div>
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <div ref={ref} css={containercss(props.height)}>
          <ResponsiveTreeMapHtml
            data={renderedNodes}
            {...TreemapVizModel}
            // @ts-ignore
            nodeComponent={(nodeProps: any) => (
              <TreeemapNode {...nodeProps} containerSize={containerSize} />
            )}
            onClick={onNodeClick}
            // @ts-ignore
            tooltip={getTooltip()}
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
      {smTooltip && (
        <SmTooltipContainer
          detailBtnLabel={`${props.label} Detail`}
          showDrilldownBtn={get(smTooltip, "data.orgs", []).length > 0}
          close={() => setSmTooltip(null)}
          gotoDetail={
            get(smTooltip, "id", "") === get(smTooltip, "data.name", "")
              ? undefined
              : () => navigateToDetailPage(smTooltip)
          }
          drilldown={
            get(smTooltip, "data.orgs", []).length > 0
              ? () => onNodeClick(smTooltip, "", true)
              : undefined
          }
        >
          <TreemapTooltip node={smTooltip} />
        </SmTooltipContainer>
      )}
    </Grid>
  );
}
