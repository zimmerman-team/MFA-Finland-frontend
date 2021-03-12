import React from "react";
import { Link } from "react-router-dom";
import { PrimaryColor } from "app/theme";
import { css } from "styled-components/macro";
import { MoreHoriz } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import { formatLocale } from "app/utils/formatLocale";
import IconButton from "@material-ui/core/IconButton";
import { Box, Grid, LinearProgress, Typography } from "@material-ui/core";

interface ProjectsListModuleProps {
  count: number;
  loading: boolean;
  loadMore: () => void;
  projects: ProjectType[];
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
};

export const ProjectsListModule = (props: ProjectsListModuleProps) => {
  const styles = {
    container: css`
      display: flex;
      flex-direction: column;
      height: calc(100vh - 224px);
      //height: max-content;
      //overflow: auto;
    `,
    title: css`
      margin-top: 34px;
      //margin-bottom: 24px;
    `,
    titleContainer: css`
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 24px;
    `,
    iconContainer: css`
      button + button {
        margin-left: 16px;
      }
    `,
    iconButton: css`
      background-color: white;
      filter: drop-shadow(0px 1px 8px rgba(0, 0, 0, 0.12));
      padding: 4px;
    `,
    icon: css`
      color: ${PrimaryColor[0]};
    `,
    listContainer: css`
      overflow: auto;
      padding-right: 24px;
      padding-left: 4px;
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
        background: #ECF1FA;
      }

      ::-webkit-scrollbar-button {
        width: 0;
        height: 0;
        display: none;
      }

      ::-webkit-scrollbar-corner {
        background-color: #ECF1FA;
      }

    \` ,
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

  return (
    <div css={styles.container}>
      <div css={styles.titleContainer}>
        <Typography variant="h6" css={styles.title}>
          {props.count} Projects
        </Typography>
        <div css={styles.iconContainer}>
          <IconButton css={styles.iconButton}>
            <SearchIcon css={styles.icon} />
          </IconButton>
          <IconButton css={styles.iconButton}>
            <MoreHoriz css={styles.icon} />
          </IconButton>
        </div>
      </div>
      <div css={styles.listContainer}>
        {props.projects.map((project: ProjectType, index: number) => {
          if (index === props.projects.length - 1) {
            return (
              <span ref={bottomItemRef} key={project.code}>
                <ListItem {...project} />
              </span>
            );
          }
          return <ListItem {...project} key={project.code} />;
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
        <Grid container item xs={10}>
          <LabelValueGridItem
            label="Planned start date"
            value={project.startDate}
          />
          <LabelValueGridItem
            label="Sector"
            value={project.sectors.join(", ")}
          />
          <LabelValueGridItem label="Status" value={project.status} />
          <LabelValueGridItem
            value="MFA Finland"
            label="Reporting organisation"
          />
          <LabelValueGridItem
            label="Planned end date"
            value={project.endDate}
          />
          <LabelValueGridItem
            label="Country/region"
            value={project.country_region.join(", ")}
          />
          <LabelValueGridItem
            label="Estimated budget"
            value={formatLocale(project.budget)}
          />
          <LabelValueGridItem
            label="Disbursement"
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
    <Grid item xs={3}>
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
