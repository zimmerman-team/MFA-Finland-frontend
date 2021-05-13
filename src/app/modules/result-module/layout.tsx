import React from "react";
import { ModuleContainer } from "app/components/ModuleContainer";
import { Box, Grid, Hidden, Typography } from "@material-ui/core";
import { css } from "styled-components/macro";
import { Breadcrumbs } from "app/components/Breadcrumb";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { Path } from "app/const/Path";
import { Anchor, InPageNavigation } from "app/components/InPageNavigation";
import { InpageNavItemModel } from "app/components/InPageNavigation/model";
import { useCMSData } from "app/hooks/useCMSData";
import get from "lodash/get";
import { urlify } from "app/utils/urlify";

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
    a {
      text-decoration: underline;
    }
  `,
};

const crumbs: BreadcrumbLinkModel[] = [
  { label: "Homepage", path: Path.home },
  { label: "Result" },
];

const navList: InpageNavItemModel[] = [
  {
    label: "Result",
    path: "result",
  },
];

export const ResultModuleLayout = () => {
  const [active, setActive] = React.useState(0);
  const cmsData = useCMSData({ returnData: true });
  const content = urlify(
    get(
      cmsData,
      "pages.resultspage",
      "sitive results build societies and contribute to global stability and wellbeing. They advance Finland’s foreign policy goals and meeting global commitments. With development cooperation Finland contributes to solving of the major problems that are facing humankind.\n" +
        "\n" +
        "More about the latest results: https://kehityspolitiikka2018.um.fi/en/\n" +
        "Download the policy results report: https://kehityspolitiikka2018.um.fi/wp-content/uploads/sites/21/2019/01/UM-KPR-2018-ENG-WEB.pdf"
    )
  );

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
        <Grid item lg={9}>
          <Anchor id="result" />
          <div css={styles.container}>
            <Typography variant="h5">Result</Typography>
            <Box width="100%" height="24px" />
            <Typography
              variant="body1"
              css={styles.paragraph}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </Grid>
      </ModuleContainer>
    </>
  );
};
