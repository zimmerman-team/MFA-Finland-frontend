import React from "react";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import { RouteTab } from "app/components/VizTabs/common/Tab";
import { vizTabs, TabProps } from "app/components/VizTabs/data";
import { Breadcrumbs } from "app/components/Breadcrumb";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { Path } from "app/const/Path";
import { css } from "styled-components/macro";
import {
  FormControl,
  MenuItem,
  Select,
  Tooltip,
  useMediaQuery,
} from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { PrimaryColor, SecondaryColor } from "app/theme";
import { PillButton } from "app/components/Buttons/PillButton";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useLocation } from "react-use";
import { FilledButton } from "app/components/Buttons/FilledButton";

const crumbs: BreadcrumbLinkModel[] = [
  { label: "Homepage", path: Path.home },
  { label: "Disbursements" },
];

interface VizTabsProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export function VizTabs(props: VizTabsProps) {
  const styles = {
    container: css`
      padding: 0 68px;
      height: 88px;
      background-color: #dde4ef;

      @media (max-width: 992px) {
        height: 120px;
        padding: 0 12px;
      }

      @media (max-width: 1440px) {
        box-shadow: -669px 0px 0px 0px #dde4ef, 669px 0px 0px 0px #dde4ef;
      }

      @media (max-width: 800px) {
        box-shadow: -300px 0px 0px 0px #dde4ef, 300px 0px 0px 0px #dde4ef;
      }

      @media (max-width: 600px) {
        box-shadow: -100px 0px 0px 0px #dde4ef, 100px 0px 0px 0px #dde4ef;
      }

      box-shadow: -1240px 0px 0px 0px #dde4ef, 1240px 0px 0px 0px #dde4ef;
    `,
    tooltip: css`
      fill: ${PrimaryColor[0]};
      :hover {
        fill: ${PrimaryColor[3]};
      }
    `,
    titleContainer: css`
      display: flex;
      margin-top: 3px;
      margin-bottom: 16px;
    `,
    title: css`
      margin-right: 12px;
    `,
    tabGrid: css`
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
    `,
    tabsList: css`
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      overflow: auto;

      @media (max-width: 992px) {
        margin-left: 36px;
      }

      &::-webkit-scrollbar {
        width: 1px;
        height: 3px;
        background: #ededf6;
      }
      &::-webkit-scrollbar-track {
        border-radius: 4px;
        background: #ededf6;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background: #2e4063;
      }
    `,
  };

  const mobile = useMediaQuery("(max-width: 600px)");

  return mobile ? (
    <VizTabsMobile {...props} />
  ) : (
    <Grid container item xs={12} sm={12} css={styles.container}>
      {/* <div css={styles.background} /> */}
      <Grid
        item
        xs={12}
        sm={12}
        md={3}
        lg={3}
        xl={3}
        css={`
          z-index: 1;
        `}
      >
        <div css="width: 100%; height: 8px;" />
        <Breadcrumbs route={crumbs} />
        <div css={styles.titleContainer}>
          <Typography variant="h5" css={styles.title}>
            Disbursements
          </Typography>
          <Tooltip title="lorem ipsum">
            <InfoOutlinedIcon css={styles.tooltip} />
          </Tooltip>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={9} lg={9} xl={9} css={styles.tabGrid}>
        <ul css={styles.tabsList}>
          {vizTabs.map((tab: TabProps) => (
            <RouteTab key={tab.name} {...tab} />
          ))}
        </ul>
      </Grid>
    </Grid>
  );
}

const VizTabsMobile = (props: VizTabsProps) => {
  const cmsData = useCMSData({ returnData: true });
  const { params } = useRouteMatch();
  const [selectedViz, setSelectedViz] = React.useState(
    getActiveTabIndex().toString()
  );
  const location = useLocation();
  const history = useHistory();

  function getActiveTabIndex() {
    return vizTabs.findIndex((tab) => {
      return tab.url.includes(get(params, "tab", ""));
    });
  }
  const crumbs: BreadcrumbLinkModel[] = [
    { label: "Homepage", path: Path.home },
    { label: "Disbursements" },
  ];

  const styles = {
    container: css`
      width: 100%;
      padding: 12px;
      #select-wrapper {
      }
      #tooltip {
        fill: ${PrimaryColor[0]};
        :hover {
          fill: ${PrimaryColor[3]};
        }
      }
    `,
    select: css`
      min-width: 160px;
      text-align: center;
      background-color: #ecf1fa;
      border: none;
      border-radius: 50px;
      font-weight: bold;
      font-size: 14px;
      line-height: 17px;
      margin-right: 4px;
    `,
    selections: css`
      margin-top: 12px;
      display: flex;
      justify-content: space-between;
    `,
    buttonContainer: css`
      display: flex;
      gap: 0;
    `,
    button: (bgColor: string, color: string) => css`
      background-color: ${bgColor};
      color: ${color};
      text-transform: none;
      box-shadow: none;

      :first-of-type {
        border-top-left-radius: 50px;
        border-bottom-left-radius: 50px;
      }

      :last-of-type {
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
      }
    `,
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const index = event.target.value;
    setSelectedViz(index as string);
    // @ts-ignore
    history.push(`${vizTabs[index].url}${location.search}`);
  };
  return (
    <div css={styles.container}>
      <Breadcrumbs route={crumbs} />

      <div css={styles.selections}>
        <div id="select-wrapper">
          <FormControl>
            <Select
              css={styles.select}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedViz}
              onChange={handleChange}
              disableUnderline
              inputProps={{ "aria-label": "Without label" }}
            >
              {vizTabs.map((tab: TabProps, index: number) => (
                <MenuItem value={index}>
                  {tab.cmsKey ? get(cmsData, tab.cmsKey, tab.name) : tab.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Tooltip title="Lorem Ipsum" interactive>
            <InfoOutlinedIcon id="tooltip" />
          </Tooltip>
        </div>

        <div css={styles.buttonContainer}>
          <PillButton
            onClick={() => props.setActiveTab("chart")}
            css={styles.button(
              props.activeTab === "chart" ? PrimaryColor[0] : SecondaryColor[1],
              props.activeTab === "chart" ? "#fff" : PrimaryColor[0]
            )}
          >
            {get(cmsData, "general.chart", "Chart")}
          </PillButton>
          <PillButton
            onClick={() => props.setActiveTab("table")}
            css={styles.button(
              props.activeTab === "table" ? PrimaryColor[0] : SecondaryColor[1],
              props.activeTab === "table" ? "#fff" : PrimaryColor[0]
            )}
          >
            {get(cmsData, "general.table", "Table")}
          </PillButton>
        </div>
      </div>
    </div>
  );
};
