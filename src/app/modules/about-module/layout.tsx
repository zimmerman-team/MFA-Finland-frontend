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

    section {
      margin-bottom: 48px;
    }

    table {
      border: 1px solid black;
    }
  `,
};

const privacyCrumbs: BreadcrumbLinkModel[] = [
  { label: "Homepage", path: Path.home },
  { label: "About" },
];

interface Props {
  data: { title: string; content: string }[];
}

export const AboutModuleLayout = (props: Props) => {
  const [active, setActive] = React.useState(0);
  const { data } = props;
  const navList = getNavList();
  console.log(navList);

  function handleClick(id: any) {
    setActive(parseInt(id, 10));
  }

  function getNavList(): InpageNavItemModel[] {
    const list: any[] = [];

    data.forEach((entry) => {
      list.push({
        label: entry.title,
        path: entry.title.toLowerCase().replace(/\s/g, "-"),
      });
    });

    return list;
  }

  // @ts-ignore
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
          {data.map((entry, index) => (
            <>
              <Anchor id={navList[index].path} />
              <article css={styles.container}>
                <Typography variant="h5" component="h2">
                  {entry.title}
                </Typography>
                <Box width="100%" height="24px" />
                <Typography
                  variant="body1"
                  css={styles.paragraph}
                  dangerouslySetInnerHTML={{ __html: entry.content || "" }}
                />
              </article>
            </>
          ))}
        </Grid>
      </ModuleContainer>
    </>
  );
};
