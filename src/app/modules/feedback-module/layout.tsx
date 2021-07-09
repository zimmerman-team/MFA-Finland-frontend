import React from "react";
import { Anchor, InPageNavigation } from "app/components/InPageNavigation";
import { InpageNavItemModel } from "app/components/InPageNavigation/model";
import { Breadcrumbs } from "app/components/Breadcrumb";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { Path } from "app/const/Path";
import { ModuleContainer } from "app/components/ModuleContainer";
import { Box, Grid, Hidden, Typography } from "@material-ui/core";
import { styles } from "app/modules/feedback-module/styles";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";

const crumbs: BreadcrumbLinkModel[] = [
  { label: "Homepage", path: Path.home },
  { label: "Feedback" },
];

const navList: InpageNavItemModel[] = [
  {
    label: "FAQs",
    path: "faq",
  },
  {
    label: "Feedback",
    path: "feedback",
  },
];

export const FeedbackLayout = () => {
  const cmsData = useCMSData({ returnData: true });
  const faqItems = get(cmsData, "pages.faq.items", []);
  const [active, setActive] = React.useState(0);
  const handleClick = (id: any) => {
    setActive(parseInt(id, 10));
  };

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
                handleClick={() => handleClick}
                active={active}
                setActive={setActive}
              />
            </div>
          </Grid>
        </Hidden>

        <Grid item lg={9}>
          <Anchor id="faq" />
          <article css={styles.container}>
            <Typography variant="h5" component="h2">
              FAQs
            </Typography>
            <Box width="100%" height="24px" />

            {faqItems.map((item: any) => {
              return (
                <>
                  <Typography variant="subtitle1" css={styles.paragraphHeader}>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    css={styles.paragraph}
                    dangerouslySetInnerHTML={{ __html: item.paragraph || "" }}
                  />
                </>
              );
            })}
          </article>

          <Anchor id="feedback" />
          <article css={styles.container}>
            <Typography variant="h5" component="h2">
              Feedback
            </Typography>
            <Box width="100%" height="24px" />
            <Typography variant="body1" css={styles.paragraph}>
              {get(
                cmsData,
                "pages.feedback",
                "We appreciate any feedback for this site or about the data that is presented on this site on"
              )}
              <a
                href="mailto:tilastot.um@formin.fi"
                css={`
                  text-decoration: underline;
                `}
              >
                tilastot.um@formin.fi
              </a>
            </Typography>
          </article>
        </Grid>
      </ModuleContainer>
    </>
  );
};
