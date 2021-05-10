import React from "react";
import get from "lodash/get";
import { css } from "styled-components/macro";
import { useLocation } from "react-router-dom";
import { useCMSData } from "app/hooks/useCMSData";
import { drawerStyle } from "app/components/Drawer/common/drawerStyle";
import {
  Grid,
  Hidden,
  Container,
  Typography,
  IconButton,
} from "@material-ui/core";

import { MfaLogo } from "app/assets/mfa_logo";
import { IconBackToTop } from "app/assets/icons/IconBackToTop";
import LogoFacebook from "app/assets/icons/logo_fb.png";
import LogoYoutube from "app/assets/icons/logo_yt.png";
import LogoLinkedin from "app/assets/icons/logo_linkedin.png";
import LogoTwitter from "app/assets/icons/logo_twitter.png";

const styles = {
  container: css`
    left: 0;
    width: 100vw;
    display: flex;
    position: absolute;
    flex-direction: column;
  `,
  top: css`
    width: 100%;
    height: 24px;
    background: #bcc6d6;
  `,
  bottom: css`
    width: 100%;
    height: 342px;
    padding-top: 50px;
    background: #2e4982;
  `,
  backToTop: css`
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    border-top: 1px solid #4f6797;

    @media (max-width: 768px) {
      justify-content: center;
    }
  `,
};

export function Footer() {
  const location = useLocation();
  const cmsData = useCMSData({ returnData: true });

  if (location.pathname.indexOf("/viz") > -1) {
    return null;
  }

  return (
    <footer css={styles.container}>
      <div css={styles.top} />
      <div css={styles.bottom}>
        <Container
          maxWidth="lg"
          css={`
            min-height: 100%;
            padding: 0 32px;
            background: #2e4982;

            @media (max-width: 992px) {
              padding: 0;
            }
          `}
        >
          <Grid
            container
            css={`
              padding-bottom: 40px;
            `}
          >
            <Grid
              item
              xs={3}
              sm={3}
              md={2}
              lg={1}
              css={`
                display: flex;
                padding-top: 20px;
                justify-content: center;

                > svg {
                  transform: scale(2);
                }
              `}
            >
              <MfaLogo />
            </Grid>
            <Grid
              item
              xs={9}
              sm={9}
              md={3}
              lg={3}
              css={drawerStyle.AddressContainer}
            >
              <Typography
                variant="body1"
                css={`
                  color: white;
                `}
              >
                Ministry for Foreign Affairs
                <br />
                PO Box 176
                <br /> FI-00023 Government
                <br /> Finland
              </Typography>
              <br /> <br />
              <Typography
                variant="body1"
                css={`
                  color: white;
                `}
              >
                {get(cmsData, "menu.telephone", "Switchboard +358 295 16001")}
                <br />
                kirjaamo.um@formin.fi
              </Typography>
            </Grid>
            <Hidden smUp>
              <Grid item xs={3} sm={3} />
            </Hidden>
            <Grid
              item
              container
              xs={9}
              sm={9}
              md={3}
              lg={3}
              css={`
                padding-left: 32px;

                @media (max-width: 960px) {
                  margin-top: 64px;
                  border-left: 1px solid #4f6797;
                }
              `}
            >
              <Grid item lg={12}>
                <div css={drawerStyle.SocialIconContainer}>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    target="_blank"
                    href={get(
                      cmsData,
                      "menu.facebooklink",
                      "https://www.facebook.com"
                    )}
                  >
                    <img
                      src={LogoFacebook}
                      css={`
                        width: 32px;
                        height: 32px;
                      `}
                      alt="facebook"
                    />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    aria-label="menu"
                    target="_blank"
                    href={get(
                      cmsData,
                      "menu.youtubelink",
                      "https://www.youtube.com"
                    )}
                  >
                    <img
                      src={LogoYoutube}
                      css={`
                        width: 32px;
                        height: 32px;
                      `}
                      alt="facebook"
                    />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    aria-label="menu"
                    target="_blank"
                    href={get(
                      cmsData,
                      "menu.linkedinlink",
                      "https://www.linkedin.com"
                    )}
                  >
                    <img
                      src={LogoLinkedin}
                      css={`
                        width: 32px;
                        height: 32px;
                      `}
                      alt="linkedin"
                    />
                  </IconButton>
                  <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    target="_blank"
                    href={get(
                      cmsData,
                      "menu.twitterlink",
                      "https://www.twitter.com"
                    )}
                  >
                    <img
                      src={LogoTwitter}
                      css={`
                        width: 32px;
                        height: 32px;
                      `}
                      alt="twitter"
                    />
                  </IconButton>
                </div>
                <br />
                <Typography
                  variant="body1"
                  css={`
                    color: white;
                  `}
                >
                  {get(cmsData, "menu.social", "")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <div css={styles.backToTop}>
            <IconButton
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                })
              }
            >
              <IconBackToTop />
            </IconButton>
          </div>
        </Container>
      </div>
    </footer>
  );
}
