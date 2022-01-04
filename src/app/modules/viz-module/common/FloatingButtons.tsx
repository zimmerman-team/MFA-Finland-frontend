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
import background from "app/assets/background.png";
import { exportPage } from "app/utils/exportPage";

interface FloatingButtonsProps {
  data: any;
  viz: string;
}

export const FloatingButtons = (props: FloatingButtonsProps) => {
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
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      position: relative;
    `,
    moreIconButton: css`
      @media (min-width: 600px) {
        margin-top: 24px;
        margin-right: 24px;
      }
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
      margin-right: 24px;
      background-color: white;
      filter: drop-shadow(0px 1px 8px rgba(0, 0, 0, 0.12));
      z-index: 3;
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
      margin-right: 24px;
      background-color: ${PrimaryColor[0]};
      filter: drop-shadow(0px 1px 8px rgba(0, 0, 0, 0.12));
      z-index: 3;
    `,
    downloadIcon: css`
      fill: white;
      transform: translateY(-1px);
    `,
  };
  const classes = tooltipCreateStyles();

  return (
    <div id="viz-floating-buttons" css={styles.container}>
      <IconButton
        css={styles.moreIconButton}
        aria-label="Toggle more options"
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
          <IconButton css={styles.shareIconButton} aria-label="Share this view">
            <LightTooltip
              aria-label="Share"
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
            aria-label="Download this view"
            css={styles.downloadIconButton}
            onClick={(e) => handleDownloadClick(e)}
          >
            <CloudDownload css={styles.downloadIcon} />
          </IconButton>
          <DownloadPopover
            viz={props.viz}
            data={props.data}
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
  const location = useLocation();
  const nodes = {
    overview: "viz-oda",
    thematic: "viz-thematic",
    sectors: "viz-sectors",
    countries: "viz-countries",
    organisations: "viz-organisations",
    budgetlines: "viz-budgetlines",
  };
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

  // function getNode() {
  //   switch (true) {
  //     case location.pathname.includes("/viz/oda"):
  //       return nodes.overview;
  //       break;
  //     case location.pathname.includes("/viz/thematic-areas"):
  //       return nodes.thematic;
  //       break;
  //     case location.pathname.includes("/viz/sectors"):
  //       return nodes.sectors;
  //       break;
  //     case location.pathname.includes("/viz/countries-regions"):
  //       return nodes.countries;
  //       break;
  //     case location.pathname.includes("/viz/organisations"):
  //       return nodes.organisations;
  //       break;
  //     case location.pathname.includes("/viz/budget-lines"):
  //       return nodes.budgetlines;
  //       break;
  //     default:
  //       return "root";
  //   }
  // }

  // function filter(node: Element) {
  //   return !["viz-floating-buttons", "viz-sidepanel-background"].includes(
  //     node.id
  //   );
  // }

  function downloadCSV() {
    return vizDataToCSV(props.data, props.viz);
  }

  // function downloadPNG() {
  //   // viz-floating-buttons
  //   // viz-sidepanel-background
  //   const element: HTMLElement | null = document.getElementById(
  //     "image-container"
  //   );

  //   domtoimage
  //     .toPng(element, {
  //       filter,
  //       style: {
  //         "$legend-items": {
  //           maxHeight: "none",
  //           border: "1px solid red",
  //         },
  //       },
  //     })
  //     .then((dataUrl: any) => {
  //       const link = document.createElement("a");
  //       link.download = "download.png";
  //       link.href = dataUrl;
  //       link.click();
  //     })
  //     .catch((error: any) => {
  //       console.error("oops, something went wrong!", error);
  //     });
  // }

  // function downloadSVG() {
  //   const element = document.getElementById(getNode());

  //   domtoimage
  //     .toSvg(element)
  //     .then((dataUrl: any) => {
  //       const link = document.createElement("a");
  //       link.download = "download.html";
  //       link.href = dataUrl;
  //       link.click();
  //     })
  //     .catch((error: any) => {
  //       console.error("oops, something went wrong!", error);
  //     });
  // }

  // function downloadPDF() {
  //   const element: HTMLElement | null = document.getElementById(
  //     "image-container"
  //   );
  //   domtoimage
  //     .toPng(element, { bgcolor: "#f8f8f8" })
  //     .then((dataUrl: any) => {
  //       const pdf = new JSPDF({
  //         orientation: "portrait",
  //         unit: "mm",
  //         format: "a4",
  //       });
  //       const imgProps = pdf.getImageProperties(dataUrl);

  //       const pdfWidth = pdf.internal.pageSize.width;
  //       const pdfHeight = pdf.internal.pageSize.height;

  //       const widthRatio = pdfWidth / imgProps.width;
  //       const heightRatio = pdfHeight / imgProps.height;
  //       const ratio = Math.min(widthRatio, heightRatio);

  //       const w = imgProps.width * ratio;
  //       const h = imgProps.height * ratio;

  //       const x = (pdf.internal.pageSize.width - w) / 2;

  //       pdf.addImage(background, "PNG", 0, 0, pdfWidth, pdfHeight);
  //       pdf.addImage(dataUrl, "PNG", x, 0, w, h);

  //       pdf.save("download.pdf");
  //     })
  //     .catch((error: any) => {
  //       console.error("oops, something went wrong!", error);
  //     });
  // }

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
        <Typography
          variant="body2"
          css={styles.listItem}
          // onClick={() => downloadPNG()}
          onClick={() => exportPage("png", "#fff")}
        >
          Chart (PNG)
        </Typography>
        <Typography
          variant="body2"
          css={styles.listItem}
          // onClick={() => downloadSVG()}
          onClick={() => exportPage("svg", "#fff")}
        >
          Chart (SVG)
        </Typography>
        <Typography
          variant="body2"
          css={styles.listItem}
          // onClick={() => downloadPDF()}
          onClick={() => exportPage("pdf", "#fff")}
        >
          Report (PDF)
        </Typography>
      </div>
    </Popover>
  );
};
