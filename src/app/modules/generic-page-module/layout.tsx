import React from "react";
import { ModuleContainer } from "app/components/ModuleContainer";
import { Box, Grid, Hidden, Typography } from "@material-ui/core";
import { Breadcrumbs } from "app/components/Breadcrumb";
import { Anchor, InPageNavigation } from "app/components/InPageNavigation";
import { InpageNavItemModel } from "app/components/InPageNavigation/model";
import { GenericPageModuleProps } from "app/modules/generic-page-module/interface";
import { styles } from "./styles";

export const GenericPageLayout = (props: GenericPageModuleProps) => {
  const [active, setActive] = React.useState(0);
  const { cards, breadcrumbs } = props;
  const navList = createNavList();

  function handleClick(id: any) {
    setActive(parseInt(id, 10));
  }

  function createNavList(): InpageNavItemModel[] {
    const list: any[] = [];

    cards.forEach((card) => {
      list.push({
        label: card.title,
        path: card.title.toLowerCase().replace(/\s/g, "-"),
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
          <Breadcrumbs route={breadcrumbs} />
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

        <Grid item md={12} lg={9}>
          {cards?.map((card, index) => (
            <>
              <Anchor id={navList[index].path} />
              <article css={styles.container}>
                <Typography variant="h5" component="h2">
                  {card.title}
                </Typography>
                <Box width="100%" height="24px" />
                {card.faqItems ? (
                  card.faqItems.items.map((item: any) => {
                    return (
                      <>
                        <Typography
                          variant="subtitle1"
                          css={styles.paragraphHeader}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          css={styles.paragraph}
                          dangerouslySetInnerHTML={{
                            __html: item.paragraph || "",
                          }}
                        />
                      </>
                    );
                  })
                ) : (
                  <Typography
                    variant="body1"
                    css={styles.paragraph}
                    dangerouslySetInnerHTML={{ __html: card.content || "" }}
                  />
                )}
              </article>
            </>
          ))}
        </Grid>
      </ModuleContainer>
    </>
  );
};
