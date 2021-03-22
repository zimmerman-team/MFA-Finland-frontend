import React from "react";
import { ModuleContainer } from "app/components/ModuleContainer";
import { Box, Grid, Hidden, Typography } from "@material-ui/core";
import { css } from "styled-components/macro";
import { Breadcrumbs } from "app/components/Breadcrumb";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { Path } from "app/const/Path";
import { PageOrnament } from "app/assets/PageOrnament";
import { Anchor, InPageNavigation } from "app/components/InPageNavigation";
import { InpageNavItemModel } from "app/components/InPageNavigation/model";

const widgetContainer = (height: string | undefined, isHovered: boolean) => css`
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 32px;
  flex-direction: column;
  background-color: #ffffff;
  padding: 32px;
  height: ${height || "328px"};
  box-shadow: ${isHovered
    ? "0 3px 6px rgba(46, 73, 130, 0.16), 0 3px 6px rgba(46, 73, 130, 0.23);"
    : ""};
  transition: box-shadow 0.3s ease-in-out;
`;

const privacyCrumbs: BreadcrumbLinkModel[] = [
  { label: "Homepage", path: Path.home },
  { label: "About" },
];

const navList: InpageNavItemModel[] = [
  {
    label: "About",
    path: "about-mfa-portal",
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
          <Anchor id="about-mfa-portal" />
          <div css={widgetContainer(undefined, false)}>
            <Typography variant="h5">About</Typography>
            <Box width="100%" height="24px" />
            <Typography variant="body1" paragraph>
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
