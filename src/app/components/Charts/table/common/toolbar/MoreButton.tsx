import React from "react";
import { Close, CloudDownload, MoreHoriz, Share } from "@material-ui/icons";
import { PrimaryColor } from "app/theme";
import { LightTooltip } from "app/components/PageFloatingButtons";
import { ShareTooltip } from "app/components/PageFloatingButtons/common/share";
import { css } from "styled-components/macro";
import { tooltipCreateStyles } from "app/components/PageFloatingButtons/styles";
import { Typography, IconButton, Popover, makeStyles } from "@material-ui/core";
import JSPDF from "jspdf";
// @ts-ignore
import domtoimage from "dom-to-image";
import { useLocation } from "react-router-dom";
import { CSVLink } from "react-csv";
import { vizDataToCSV } from "app/utils/vizDataToCSV";

interface FloatingButtonsProps {
  data: any;
  viz: string;
}

export const MoreActions = (props: FloatingButtonsProps) => {
  const [moreActive, setMoreActive] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleDownloadClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const styles = {
    container: css`
      display: inline-block;
      //flex-direction: column;
      //align-items: flex-end;
      //position: relative;
    `,
    moreIconButton: css`
      //margin-top: 24px;
      //margin-right: 24px;
      width: 32px;
      height: 32px;
      background-color: white;
      filter: drop-shadow(0px 1px 8px rgba(0, 0, 0, 0.12));
      z-index: 3;
    `,
    moreIcon: css`
      fill: ${PrimaryColor[0]};
    `,
    shareIconButton: css`
      position: absolute;
      width: 32px;
      height: 32px;
      top: 72px;
      right: 0px;
      background-color: white;
      filter: drop-shadow(0px 1px 8px rgba(0, 0, 0, 0.12));
      z-index: 6;
    `,
    shareIcon: css`
      fill: ${PrimaryColor[0]};
      transform: translateX(-1px);
    `,
    downloadIconButton: css`
      position: absolute;
      top: 120px;
      width: 32px;
      height: 32px;
      right: 0px;
      background-color: ${PrimaryColor[0]};
      filter: drop-shadow(0px 1px 8px rgba(0, 0, 0, 0.12));
      z-index: 6;
    `,
    downloadIcon: css`
      fill: white;
      transform: translateY(-1px);
    `,
  };
  const classes = tooltipCreateStyles();

  return (
    <div id="table-more-button" css={styles.container}>
      <IconButton
        css={styles.moreIconButton}
        onClick={() => setMoreActive(!moreActive)}
      >
        {moreActive ? (
          <Close css={styles.moreIcon} />
        ) : (
          <MoreHoriz css={styles.moreIcon} />
        )}
      </IconButton>
      {moreActive && (
        <>
          <IconButton css={styles.shareIconButton}>
            <LightTooltip
              arrow
              interactive
              placement="left"
              classes={{
                tooltip: classes.tooltip,
              }}
              title={<ShareTooltip />}
            >
              <Share css={styles.shareIcon} />
            </LightTooltip>
          </IconButton>
          <IconButton
            css={styles.downloadIconButton}
            onClick={(e) => handleDownloadClick(e)}
          >
            <CloudDownload css={styles.downloadIcon} />
          </IconButton>
          <DownloadPopover
            // viz={props.viz}
            // data={props.data}
            viz=""
            data={{}}
            anchorEl={anchorEl}
            handleClose={handleClose}
          />
        </>
      )}
    </div>
  );
};

interface DownloadPopoverProps {
  data: any;
  viz: string;
  anchorEl: HTMLButtonElement | null;
  // eslint-disable-next-line @typescript-eslint/ban-types
  handleClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
}

const DownloadPopover = (props: DownloadPopoverProps) => {
  const open = Boolean(props.anchorEl);
  const styles = {
    container: css`
      padding-top: 6px;
      padding-bottom: 11px;
      border-radius: 15px;
      width: 108px;
    `,
    title: css`
      line-height: 17px;
      padding: 8px 15px;
      font-family: "Finlandica";
    `,
    listItem: css`
      line-height: 17px;
      padding: 4px 15px;
      white-space: nowrap;
      :hover {
        cursor: pointer;
        background-color: #ecf1fa;
      }
    `,
  };

  const popoverStyles = makeStyles({
    paper: {
      boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.12)",
      borderRadius: "15px",
      transform: "translateX(-9px)",
    },
  });

  function downloadCSV() {
    return vizDataToCSV(props.data, props.viz);
  }

  const classes = popoverStyles();

  return (
    <Popover
      // id={id}
      open={open}
      anchorEl={props.anchorEl}
      onClose={props.handleClose}
      classes={{ paper: classes.paper }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <div css={styles.container}>
        <Typography variant="subtitle2" css={styles.title}>
          Download
        </Typography>
        <Typography variant="body2" css={styles.listItem}>
          <CSVLink target="_blank" id="download-csv" {...downloadCSV()}>
            Data (CSV)
          </CSVLink>
        </Typography>
      </div>
    </Popover>
  );
};
