import React from "react";
import { ModuleContainer } from "app/components/ModuleContainer";
import { Box, Grid, Hidden, Typography } from "@material-ui/core";
import { css } from "styled-components/macro";
import { Breadcrumbs } from "app/components/Breadcrumb";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { Path } from "app/const/Path";
import { Anchor, InPageNavigation } from "app/components/InPageNavigation";
import { InpageNavItemModel } from "app/components/InPageNavigation/model";
import { urlify } from "app/utils/urlify";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";
import { getCMSContent } from "app/utils/getCMSContent";

export const styles = {
  container: css`
    width: 100%;
    padding: 28px;
    padding-bottom: 44px;
    background-color: white;
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.12);
    border-radius: 30px;
    margin-bottom: 24px;
  `,
  gridContainer: css`
    .MuiGrid-root {
      flex-grow: 1;
    }
  `,
  paragraphHeader: css`
    margin-bottom: 16px;
  `,
  paragraph: css`
    margin-bottom: 24px;
  `,
};

const crumbs: BreadcrumbLinkModel[] = [
  { label: "Homepage", path: Path.home },
  { label: "Statement" },
];

const navList: InpageNavItemModel[] = [
  {
    label: "Statement",
    path: "statement",
  },
];

export const StatementModuleLayout = () => {
  const [active, setActive] = React.useState(0);
  const cmsData = useCMSData({ returnData: true });
  const statementContent = getCMSContent(cmsData, "pages.statement");

  function handleClick(id: any) {
    setActive(parseInt(id, 10));
  }

  return (
    <>
      <ModuleContainer>
        <Box width="100%" height="16px" />
        <Grid item lg={12}>
          <Breadcrumbs route={crumbs} />
        </Grid>

        <Hidden mdDown>
          <Grid item lg={3}>
            <div
              css={`
                position: sticky;
                top: 140px;
              `}
            >
              <InPageNavigation
                lists={navList}
                handleClick={handleClick}
                active={active}
                setActive={setActive}
              />
            </div>
          </Grid>
        </Hidden>
        <Grid item lg={9} css="width: 100%;">
          <Anchor id="statement" />
          <div css={styles.container}>
            <Typography variant="h5">Statement</Typography>
            <Box width="100%" height="24px" />
            <Typography
              variant="body1"
              css={styles.paragraph}
              dangerouslySetInnerHTML={{ __html: statementContent || "" }}
            />
          </div>
        </Grid>
      </ModuleContainer>
    </>
  );
};
