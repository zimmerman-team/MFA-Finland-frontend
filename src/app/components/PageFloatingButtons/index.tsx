/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, Theme } from "@material-ui/core/styles";
import {
  buttoncss,
  containercss,
  buttonscontainercss,
  tooltipCreateStyles,
} from "app/components/PageFloatingButtons/styles";
import { IconMap } from "app/assets/icons/IconMap";
import { IconShare } from "app/assets/icons/IconShare";
import { IconDownload } from "app/assets/icons/IconDownload";
import { ShareTooltip } from "app/components/PageFloatingButtons/common/share";
import { useCMSData } from "app/hooks/useCMSData";
import get from "lodash/get";
import { ExportTooltip } from "./common/export";

export const LightTooltip = withStyles((theme: Theme) => ({
  arrow: {
    color: theme.palette.common.white,
  },
  tooltip: {
    color: "#002561",
    backgroundColor: theme.palette.common.white,
    boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.12)",
  },
}))(Tooltip);

export function PageFloatingButtons() {
  function scrollToMap() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }

  const classes = tooltipCreateStyles();
  const cmsData = useCMSData({
    returnData: true,
  });

  return (
    <div css={containercss}>
      <div css={buttonscontainercss}>
        <LightTooltip
          placement="left"
          title={get(cmsData, "tooltips.map_button", "Go to map")}
        >
          <button
            type="button"
            tabIndex={0}
            aria-label="Go to map"
            css={buttoncss}
            onClick={scrollToMap}
          >
            <IconMap />
          </button>
        </LightTooltip>
        <LightTooltip
          arrow
          interactive
          placement="left"
          classes={{
            tooltip: classes.tooltip,
          }}
          enterTouchDelay={0}
          title={<ShareTooltip cmsData={cmsData} />}
          aria-pressed="false"
        >
          <button
            tabIndex={0}
            type="button"
            aria-label="Share this view"
            css={buttoncss}
          >
            <IconShare />
          </button>
        </LightTooltip>
        <LightTooltip
          arrow
          interactive
          placement="left"
          enterTouchDelay={0}
          classes={{
            tooltip: classes.tooltip,
          }}
          title={<ExportTooltip cmsData={cmsData} />}
        >
          <button
            tabIndex={0}
            type="button"
            aria-label="Download this view"
            css={buttoncss}
          >
            <IconDownload />
          </button>
        </LightTooltip>
      </div>
    </div>
  );
}
