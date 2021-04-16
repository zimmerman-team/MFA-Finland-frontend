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
import { exportPage } from "app/utils/exportPage";
import { ExportTooltip } from "./common/export";

export const LightTooltip = withStyles((theme: Theme) => ({
  arrow: {
    color: theme.palette.common.white,
  },
  tooltip: {
    color: "#2E4982",
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

  return (
    <div css={containercss}>
      <div css={buttonscontainercss}>
        <LightTooltip placement="left" title="Go to map">
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
          title={<ShareTooltip />}
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
          classes={{
            tooltip: classes.tooltip,
          }}
          title={<ExportTooltip />}
        >
          <button
            tabIndex={0}
            type="button"
            aria-label="Go to map"
            css={buttoncss}
            aria-pressed="false"
          >
            <IconDownload />
          </button>
        </LightTooltip>
      </div>
    </div>
  );
}
