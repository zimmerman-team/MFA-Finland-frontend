import React from "react";
import get from "lodash/get";
import { css } from "styled-components/macro";
import { NavLink, useLocation } from "react-router-dom";
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
import { useRecoilState } from "recoil";
import { languageAtom } from "app/state/recoil/atoms";

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
    background: #002561;
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
  link: css`
    color: white;
    font-size: 16px;
    line-height: 19px;

    :hover {
      color: white;
      text-decoration: underline;
    }
  `,
};

export function Footer() {
  const location = useLocation();
  const cmsData = useCMSData({ returnData: true });
  const [currentLanguage] = useRecoilState(languageAtom);

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
            background: #002561;

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
              component="nav"
              css={drawerStyle.AddressContainer}
            >
              <NavLink
                to={`/${
                  currentLanguage === "se" ? "sv" : currentLanguage
                }/feedback`}
                css={styles.link}
              >
                {get(cmsData, `menu.feedback`, "Feedback")}
              </NavLink>
              <NavLink
                to={`/${
                  currentLanguage === "se" ? "sv" : currentLanguage
                }/about`}
                css={styles.link}
              >
                {get(cmsData, `menu.about`, "About")}
              </NavLink>
              <NavLink
                to={`/${
                  currentLanguage === "se" ? "sv" : currentLanguage
                }/data`}
                css={styles.link}
              >
                {get(cmsData, `menu.result`, "Result")}
              </NavLink>
              <NavLink
                to={`/${
                  currentLanguage === "se" ? "sv" : currentLanguage
                }/statements`}
                css={styles.link}
              >
                {get(cmsData, `menu.statements`, "Statements")}
              </NavLink>
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
                <LogoButtons cmsData={cmsData} />
                <br />
                <Typography
                  variant="body1"
                  css={`
                    color: white;
                  `}
                >
                  {get(cmsData, "menu.social", "")}
                  <br />
                  <a
                    href={`https://${get(
                      cmsData,
                      "menu.website",
                      "www.um.fi"
                    )}`}
                    css={styles.link}
                    target="_blank"
                    rel="noopener"
                  >
                    {get(cmsData, "menu.website", "www.um.fi")}
                  </a>
                </Typography>
              </Grid>
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
                border-left: 1px solid #4f6797;

                @media (max-width: 960px) {
                  margin-top: 64px;
                }
              `}
            >
              <Hidden smUp>
                <Grid item lg={12}>
                  <Typography variant="body1" css="color: white;">
                    {get(cmsData, "menu.name", "")}
                    <br />
                    {get(cmsData, "menu.adress", "")}
                    <br />
                    {get(cmsData, "menu.code", "")}
                    <br />
                    {get(cmsData, "menu.country", "")}
                    <br />
                    <br />
                    {get(cmsData, "menu.telephone", "")}
                    <br />
                    <a href={get(cmsData, "menu.email", "")} css={styles.link}>
                      {get(cmsData, "menu.email", "")}
                    </a>
                  </Typography>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
          <div css={styles.backToTop}>
            <IconButton
              aria-label="back to top"
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

const LogoButtons = ({ cmsData }: { cmsData: any }) => {
  return (
    <div css={drawerStyle.SocialIconContainer}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="Go to our facebook"
        target="_blank"
        href={get(cmsData, "menu.facebooklink", "https://www.facebook.com")}
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
        aria-label="Go to our youtube"
        target="_blank"
        href={get(cmsData, "menu.youtubelink", "https://www.youtube.com")}
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
        aria-label="Go to our LinkedIn"
        target="_blank"
        href={get(cmsData, "menu.linkedinlink", "https://www.linkedin.com")}
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
        aria-label="Go to our twitter"
        target="_blank"
        href={get(cmsData, "menu.twitterlink", "https://www.twitter.com")}
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
  );
};
