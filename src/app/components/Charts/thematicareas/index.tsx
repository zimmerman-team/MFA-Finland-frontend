/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import get from "lodash/get";
import maxBy from "lodash/maxBy";
import { useRecoilState } from "recoil";
import { PrimaryColor } from "app/theme";
import Grid from "@material-ui/core/Grid";
import { ResponsivePie } from "@nivo/pie";
import Hidden from "@material-ui/core/Hidden";
import { hexToRGBA } from "app/utils/hexToRgba";
import { useCMSData } from "app/hooks/useCMSData";
import { useHistory, Link } from "react-router-dom";
import { formatLocale } from "app/utils/formatLocale";
import { languageAtom } from "app/state/recoil/atoms";
import { formatMoneyWithPrefix } from "app/utils/formatMoneyWithPrefix";
import {
  directions,
  DataProps,
  ThematicAreasProps,
} from "app/components/Charts/thematicareas/data";
import {
  containercss,
  itemcirclecss,
  progressfillcss,
  itemcirclelabelcss,
  rightsideinfopanel,
  progresscontainercss,
  rightsideinfopanelitem,
  rightsideinfopaneltitle,
  rightsideinfopanelvalues,
} from "app/components/Charts/thematicareas/styles";

export function ThematicAreas(props: ThematicAreasProps) {
  const history = useHistory();
  const cmsData = useCMSData({ returnData: true });
  const [currentLanguage] = useRecoilState(languageAtom);
  const maxValue = get(maxBy(props.data, "value"), "value", 0);

  if (props.showSingleCircle) {
    let selected = props.data[0];
    if (!selected) {
      selected = {
        ref: "",
        name: "",
        size: 0,
        area: "",
        color: "",
        value: 0,
        primary: {
          name: "",
          area: "",
          value: 0,
        },
        secondary: {
          name: "",
          area: "",
          value: 0,
        },
      };
    }
    return (
      <Grid
        data-cy="priority-area-pie-simple"
        container
        direction="row"
        justify="center"
        alignItems="center"
        css={`
          height: 300px;
          text {
            font-size: 12px !important;
            font-family: Finlandica !important;
          }
          circle {
            stroke-width: 1px;
            stroke: #002561;
          }
        `}
      >
        <ResponsivePie
          data={[
            {
              id: "Main priority",
              label: get(cmsData, "priorityAreas.main", "Main priority"),
              value: selected.primary.value,
              color: selected.color,
            },
            {
              id: "Secondary priority",
              label: get(
                cmsData,
                "priorityAreas.secondary",
                "Secondary priority"
              ),
              value: selected.secondary.value,
              color: hexToRGBA(selected.color, 0.5),
            },
          ]}
          margin={{ top: 80, right: 0, bottom: 30, left: 0 }}
          borderWidth={0.5}
          borderColor="#002561"
          arcLinkLabel={(e: any) => {
            return `${formatMoneyWithPrefix(e.value, currentLanguage)}`;
          }}
          colors={[selected.color, hexToRGBA(selected.color, 0.5)]}
          arcLinkLabelsSkipAngle={6}
          arcLinkLabelsTextOffset={6}
          arcLinkLabelsTextColor="#002561"
          arcLinkLabelsOffset={1}
          arcLinkLabelsDiagonalLength={7}
          arcLinkLabelsStraightLength={8}
          arcLinkLabelsColor="#002561"
          enableArcLabels={false}
          isInteractive={false}
          legends={[
            {
              translateX: 0,
              justify: false,
              translateY: 25,
              itemWidth: 100,
              itemHeight: 10,
              itemOpacity: 1,
              symbolSize: 8,
              itemsSpacing: 16,
              direction: "row",
              anchor: "bottom",
              symbolShape: "circle",
              itemDirection: "left-to-right",
              itemTextColor: PrimaryColor[0],
            },
          ]}
        />
      </Grid>
    );
  }

  return (
    <Grid container justify="center" alignItems="center" direction="row">
      <Grid
        item
        xs={12}
        md={12}
        lg={props.showOnlyViz ? 12 : 6}
        xl={props.showOnlyViz ? 12 : 6}
        css={containercss}
        data-cy="priority-area-pie-chart"
      >
        {props.data.map((item: DataProps, index: number) => (
          <React.Fragment key={item.name}>
            <div
              key={item.name}
              css={itemcirclecss(item.size, item.color, directions[index])}
            >
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
            <div
              css={itemcirclelabelcss(
                index,
                !props.showOnlyViz,
                props.linkedLabels
              )}
              onClick={() => {
                if (props.linkedLabels) {
                  history.push(
                    `/thematic-area/${item.ref}${
                      history.location.search.length > 0 ? "/" : ""
                    }${history.location.search}`
                  );
                }
              }}
            >
              {get(
                cmsData.priorityAreas,
                `${item.ref.split("|")[0].replace(/ /g, "")}`,
                item.area
              )}
              {props.showOnlyViz && (
                <div css="margin-top: 5px;">
                  {formatMoneyWithPrefix(
                    item.primary.value + item.secondary.value,
                    currentLanguage
                  )}
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
      </Grid>
      <Hidden lgUp>
        {props.data.length > 0 && <div css="width: 100%;height: 100px;" />}
      </Hidden>
      {!props.showOnlyViz && (
        <Grid item xs={12} md={12} lg={6} xl={6} css={rightsideinfopanel}>
          <div data-cy="priority-area-coordinate" css={rightsideinfopaneltitle}>
            {get(cmsData, "priorityAreas.main", "Main priority")}/
            {get(cmsData, "priorityAreas.secondary", "Secondary priority")}
          </div>
          {props.data.map((item: DataProps) => (
            <div css={rightsideinfopanelitem} key={item.name}>
              <Link to={`/thematic-area/${item.ref}`}>
                {get(
                  cmsData.priorityAreas,
                  `${item.ref.split("|")[0].replace(/ /g, "")}`,
                  item.area
                )}
              </Link>
              <div
                css={progresscontainercss(
                  item.color,
                  (item.value * 100) / maxValue
                )}
              >
                <div
                  css={progressfillcss(
                    item.color,
                    (item.primary.value * 100) / item.secondary.value
                  )}
                />
              </div>
              <div css={rightsideinfopanelvalues}>
                {formatLocale(item.primary.value)}/
                {formatLocale(item.secondary.value)}
              </div>
            </div>
          ))}
        </Grid>
      )}
    </Grid>
  );
}
