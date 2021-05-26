import React from "react";
import get from "lodash/get";
import { Link } from "react-router-dom";
import { PrimaryColor } from "app/theme";
import { css } from "styled-components/macro";
import { useCMSData } from "app/hooks/useCMSData";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { Box, Grid, LinearProgress, Typography } from "@material-ui/core";
import { formatLargeAmountsWithPrefix } from "app/utils/formatMoneyWithPrefix";
import { SearchField } from "app/components/AppBar/common/Search/common/SearchField";
import { FloatingButtons } from "app/components/Charts/modules/projects/common/FloatingButtons";
import useMediaQuery from "@material-ui/core/useMediaQuery";

interface ProjectsListModuleProps {
  count: number;
  loading: boolean;
  searchKey: string;
  loadMore: () => void;
  projects: ProjectType[];
  setSearchKey: (searchKey: string) => void;
}

export type ProjectType = {
  code: string;
  title: string;
  budget: number;
  status: string;
  endDate: string;
  startDate: string;
  sectors: string[];
  description: string;
  country_region: string[];
  disbursementPercentage: number;
  cmsData: any;
};

export const ProjectsListModule = (props: ProjectsListModuleProps) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const mobile = useMediaQuery("(max-width: 600px)");

  const cmsData = useCMSData({ returnData: true });
  const styles = {
    container: css`
      display: flex;
      flex-direction: column;
      height: calc(100vh - 224px);
      //height: max-content;
      //overflow: auto;
    `,
    title: css``,
    titleContainer: css`
      display: flex;
      margin: 24px 0;
      align-items: center;
      justify-content: space-between;
    `,
    iconContainer: css`
      gap: 16px;
      display: flex;
      padding-right: 50px;
      @media (min-width: 600px) {
        > div {
          margin-right: -50px;
        }
      }

      @media (max-width: 600px) {
        padding: 0;
      }
    `,
    iconButton: css`
      padding: 6px;
      background-color: white;
      filter: drop-shadow(0px 1px 8px rgba(0, 0, 0, 0.12));
    `,
    icon: css`
      color: ${PrimaryColor[0]};
    `,
    listContainer: css`
      overflow: auto;
      padding-right: 12px;
      padding-left: 2px;
      padding-top: 4px;
      padding-bottom: 128px;

      &::-webkit-scrollbar {
        width: 4px;
        border-radius: 4px;
        background: transparent;
      }

      &::-webkit-scrollbar-track {
        border-radius: 4px;
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        height: 156px;
        background: #ecf1fa;
      }

      ::-webkit-scrollbar-button {
        width: 0;
        height: 0;
        display: none;
      }

      ::-webkit-scrollbar-corner {
        background-color: #ecf1fa;
      }
    `,
  };

  const observer = React.useRef<IntersectionObserver>();
  const bottomItemRef = React.useCallback(
    (node) => {
      if (props.loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          props.loadMore();
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [props.loading]
  );

  React.useEffect(() => {
    if (props.searchKey.length > 0 && !isFocused) {
      setIsFocused(true);
    }
  }, [props.searchKey]);

  return (
    <div css={styles.container}>
      <div css={styles.titleContainer}>
        <Typography variant="h6" css={styles.title}>
          {props.count} {get(cmsData, "viz.projects", "projects").toLowerCase()}
        </Typography>
        <div css={styles.iconContainer}>
          <SearchField
            useOpacity
            smallWidth="0px"
            cmsData={cmsData}
            isFocused={isFocused}
            value={props.searchKey}
            setIsFocused={setIsFocused}
            setValue={props.setSearchKey}
            onBlur={
              props.searchKey.length === 0
                ? () => setIsFocused(false)
                : undefined
            }
          />
          {!mobile && (
            <IconButton
              aria-label="Search"
              css={styles.iconButton}
              onClick={() => setIsFocused(true)}
            >
              <SearchIcon css={styles.icon} />
            </IconButton>
          )}
          <FloatingButtons searchKey={props.searchKey} />
        </div>
      </div>
      <div css={styles.listContainer}>
        {props.projects.map((project: ProjectType, index: number) => {
          if (index === props.projects.length - 1) {
            return (
              <span
                ref={bottomItemRef}
                key={project.code}
                role="button"
                tabIndex={0}
              >
                <ListItem {...project} cmsData={cmsData} />
              </span>
            );
          }
          return <ListItem {...project} key={project.code} cmsData={cmsData} />;
        })}
        {props.loading && <div css="text-align: center;">Loading...</div>}
      </div>
    </div>
  );
};

const ListItem = (project: ProjectType) => {
  const styles = {
    container: css`
      background: #ffffff;
      box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.12);
      border-radius: 10px;
      padding: 24px;
      padding-bottom: 0px;
      margin-bottom: 16px;
      :hover {
        box-shadow: 0 3px 6px rgba(46, 73, 130, 0.16),
          0 3px 6px rgba(46, 73, 130, 0.23);
        transition: box-shadow 0.3s ease-in-out;
        cursor: pointer;
      }

      &&:focus {
        box-shadow: 0 3px 6px rgba(46, 73, 130, 0.16),
          0 3px 6px rgba(46, 73, 130, 0.23);
        //transition: box-shadow 0.3s ease-in-out;
        cursor: pointer;
      }
    `,
    name: css`
      margin-bottom: 12px;
      line-height: 21.6px;
    `,
    description: css`
      margin-bottom: 32px;
      line-height: 16.8px;
    `,
    label: css`
      margin-bottom: 8px;
    `,
    value: css``,
  };

  return (
    <Link to={`/project/${project.code}`}>
      <div css={styles.container}>
        <Typography variant="h6" css={styles.name}>
          {project.title}
        </Typography>
        <Typography variant="body2" css={styles.description}>
          {project.description.split(".")[0]}
        </Typography>
        <Grid container item xs={12} sm={10}>
          <LabelValueGridItem
            label={get(project.cmsData, "viz.startdate", "Planned start date")}
            value={project.startDate}
          />
          <LabelValueGridItem
            label={get(project.cmsData, "viz.sector", "Sector")}
            value={project.sectors.join(", ")}
          />
          <LabelValueGridItem
            label={get(project.cmsData, "viz.status", "Status")}
            value={project.status}
          />
          <LabelValueGridItem
            value="MFA Finland"
            label={get(
              project.cmsData,
              "viz.reportingorg",
              "Reporting organisation"
            )}
          />
          <LabelValueGridItem
            label={get(project.cmsData, "viz.enddate", "Planned end date")}
            value={project.endDate}
          />
          <LabelValueGridItem
            label={get(
              project.cmsData,
              "viz.countriesregions",
              "Country/region"
            )}
            value={project.country_region.join(", ")}
          />
          <LabelValueGridItem
            label={get(
              project.cmsData,
              "viz.estimatedbudget",
              "Estimated budget"
            )}
            value={formatLargeAmountsWithPrefix(project.budget)}
          />
          <LabelValueGridItem
            label={get(
              project.cmsData,
              "viz.disbursementsamount",
              "Disbursements amount"
            )}
            value={project.disbursementPercentage}
          />
        </Grid>
      </div>
    </Link>
  );
};

const LabelValueGridItem = (props: {
  label: string;
  value: string | number;
}) => {
  const styles = {
    label: css`
      margin-bottom: 8px;
    `,
    value: css`
      margin-bottom: 24px;
    `,
    progress: css`
      border-radius: 20px;
      > div {
        border-radius: 20px;
      }
    `,
  };

  return (
    <Grid item xs={6} sm={3}>
      <Typography variant="subtitle2" css={styles.label}>
        {props.label}
      </Typography>
      {typeof props.value === "number" ? (
        <Box display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            <LinearProgress
              variant="determinate"
              value={props.value}
              css={styles.progress}
            />
          </Box>
          <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">{`${Math.round(
              props.value
            )}%`}</Typography>
          </Box>
        </Box>
      ) : (
        <Typography variant="body2" css={styles.value}>
          {props.value.length > 0 ? props.value : "N/A"}
        </Typography>
      )}
    </Grid>
  );
};
