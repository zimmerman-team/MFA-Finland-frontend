import React from "react";
import { ModuleContainer } from "app/components/ModuleContainer";
import { Box, Grid, Hidden, Typography } from "@material-ui/core";
import { css } from "styled-components/macro";
import { Breadcrumbs } from "app/components/Breadcrumb";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { Path } from "app/const/Path";
import { Anchor, InPageNavigation } from "app/components/InPageNavigation";
import { InpageNavItemModel } from "app/components/InPageNavigation/model";

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

const privacyCrumbs: BreadcrumbLinkModel[] = [
  { label: "Homepage", path: Path.home },
  { label: "About" },
];

const navList: InpageNavItemModel[] = [
  {
    label: "About",
    path: "about-mfa-portal",
  },
  {
    label: "Privacy Policy",
    path: "privacy",
  },
  {
    label: "Cookie Policy",
    path: "cookie",
  },
];

export const AboutModuleLayout = () => {
  const [active, setActive] = React.useState(0);

  function handleClick(id: any) {
    setActive(parseInt(id, 10));
  }

  return (
    <>
      <ModuleContainer>
        <Box width="100%" height="16px" />
        <Grid item lg={12}>
          <Breadcrumbs route={privacyCrumbs} />
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
        <Grid item lg={9}>
          <Anchor id="about" />
          <div css={styles.container}>
            <Typography variant="h5">About</Typography>
            <Box width="100%" height="24px" />
            <Typography variant="body1" css={styles.paragraph}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially
            </Typography>
          </div>

          <Anchor id="privacy" />
          <div css={styles.container}>
            <Typography variant="h5">Privacy Policy</Typography>
            <Box width="100%" height="24px" />
            <Typography variant="body1" css={styles.paragraph}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially
            </Typography>
          </div>

          <Anchor id="cookie" />
          <div css={styles.container}>
            <Typography variant="h5">Cookie Policy</Typography>
            <Box width="100%" height="24px" />
            <Typography variant="body1" css={styles.paragraph}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially
            </Typography>
          </div>
        </Grid>
      </ModuleContainer>
    </>
  );
};
