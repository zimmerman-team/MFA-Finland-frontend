/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
// @ts-ignore
import domtoimage from "dom-to-image";
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
import { makeStyles } from "@material-ui/core";

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

export function PageFloatingButtons(props: any) {
  function scrollToMap() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }

  function exportPage() {
    const node = document.getElementById("root");

    domtoimage
      .toPng(node, { bgcolor: "#f8f8f8" })
      .then((dataUrl: any) => {
        const link = document.createElement("a");
        link.download = "download.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((error: any) => {
        console.error("oops, something went wrong!", error);
      });
  }

  const classes = tooltipCreateStyles();

  return (
    <div css={containercss}>
      <div css={buttonscontainercss}>
        <LightTooltip placement="left" title="Go to map">
          <div css={buttoncss} onClick={scrollToMap}>
            <IconMap />
          </div>
        </LightTooltip>
        <LightTooltip
          arrow
          interactive
          placement="left"
          classes={{
            tooltip: classes.tooltip,
          }}
          title={<ShareTooltip />}
        >
          <div css={buttoncss}>
            <IconShare />
          </div>
        </LightTooltip>
        <LightTooltip placement="left" title="Export page">
          <div css={buttoncss} onClick={exportPage}>
            <IconDownload />
          </div>
        </LightTooltip>
      </div>
    </div>
  );
}
