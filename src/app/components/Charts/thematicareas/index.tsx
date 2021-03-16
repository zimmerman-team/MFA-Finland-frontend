/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import get from "lodash/get";
import maxBy from "lodash/maxBy";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
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
import { formatLocale } from "app/utils/formatLocale";

export function ThematicAreas(props: ThematicAreasProps) {
  const maxValue = get(maxBy(props.data, "value"), "value", 0);

  return (
    <Grid container justify="center" alignItems="center" direction="row">
      <Grid
        item
        xs={12}
        md={12}
        lg={props.showOnlyViz ? 12 : 6}
        xl={props.showOnlyViz ? 12 : 6}
        css={containercss}
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
            <div css={itemcirclelabelcss(directions[index])}>{item.area}</div>
          </React.Fragment>
        ))}
      </Grid>
      <Hidden lgUp>
        <div css="width: 100%;height: 100px;" />
      </Hidden>
      {!props.showOnlyViz && (
        <Grid item xs={12} md={12} lg={6} xl={6} css={rightsideinfopanel}>
          <div css={rightsideinfopaneltitle}>
            Main priority/Secondary priority
          </div>
          {props.data.map((item: DataProps) => (
            <div css={rightsideinfopanelitem} key={item.name}>
              <div>{item.area}</div>
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
