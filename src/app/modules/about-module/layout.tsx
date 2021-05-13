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
          <article css={styles.container}>
            <Typography variant="h5">Cookie Policy</Typography>
            <Box width="100%" height="24px" />
            <Typography variant="body1" css={styles.paragraph}>
              <section>
                <b>1. The use of cookies</b>
                <p>
                  <a href="www.openaid.fi">www.openaid.fi</a> makes use of
                  cookies. A cookie is a simple small file that is sent along
                  with pages from this website and is stored by your browser on
                  the hard drive of your computer, mobile phone, smartwatch or
                  tablet. The information stored therein can be sent back to our
                  servers on a subsequent visit.
                </p>
                <p>
                  The use of cookies is of great importance for the proper
                  running of our website, but also cookies of which you do not
                  immediately see the effect are very important. Thanks to the
                  (anonymous) input from visitors, we can improve the use of the
                  website and make it more user-friendly.
                </p>
              </section>
              <section>
                <b>2. Consent to the use of cookies</b>
                <p>
                  Your permission is required for the use of certain cookies. We
                  do this by means of a so-called cookie banner.
                </p>
              </section>
              <section>
                <b>3. The type of cookies used and their objectives</b>
                <p>MFA will provide the same for analytics cookies.</p>
                <p>We use the following types of cookies:</p>
                <p>
                  Functional cookies: with this we can make the website function
                  better and it is more user-friendly for the visitor.
                </p>
                <p>
                  Analytical cookies: these ensure that a cookie is generated
                  every time you visit a website. These cookies know whether you
                  have visited the site before or not. Only on the first visit,
                  a cookie is created, on subsequent visits the existing cookie
                  is used. This cookie is only for statistical purposes. For
                  example, the following data can be collected, such as:
                </p>
                <ul>
                  <li>Which pages you have viewed</li>
                  <li>How long you stayed on a particular page</li>
                  <li>At which page you left the site</li>
                  <li>
                    Tracking cookies from others: this keeps track of which
                    pages you visit on the internet in order to build your
                    personal profile. This profile is not linked to your name,
                    address, e-mail address and the like as known to us, but
                    only serves to match advertisements to your profile so that
                    they are as relevant to you as possible. We ask your
                    permission for these cookies. These cookies are therefore
                    not placed without your permission.
                  </li>
                  Tracking cookies from others: this keeps track of which pages
                  you visit on the internet in order to build your personal
                  profile. This profile is not linked to your name, address,
                  e-mail address and the like as known to us, but only serves to
                  match advertisements to your profile so that they are as
                  relevant to you as possible. We ask your permission for these
                  cookies. These cookies are therefore not placed without your
                  permission.
                  <li>
                    Site improvement cookies: with this we can test different
                    versions of a web page to see which page is best visited.
                  </li>
                </ul>
                {/*  @ts-ignore */}
                <table border="1">
                  {/* <tbody> */}
                  <tr>
                    <td>Name</td>
                    <td>Source</td>
                    <td>Purpose</td>
                  </tr>

                  <tr>
                    <td>cookieNotice</td>
                    <td>First party</td>
                    <td>
                      Stores your cookie preferences (so you won’t be asked
                      again)
                    </td>
                  </tr>

                  <tr>
                    <td>cloud.session.token</td>
                    <td>Atlassian</td>
                    <td>JIRA Authentication Cookie</td>
                  </tr>

                  <tr>
                    <td>atlassian.xsrf.token</td>
                    <td>Atlassian</td>
                    <td>
                      Helps prevent XSRF attacks. Ensures that during a user's
                      session, browser requests sent to a JIRA server originated
                      from that JIRA server.
                    </td>
                  </tr>

                  <tr>
                    <td>ajs_group_id</td>
                    <td>Atlassian</td>
                    <td>
                      Used to collect data about visitor’s activity on the Site
                      and how we can target user groups for marketing purposes.
                    </td>
                  </tr>

                  <tr>
                    <td>ajs_anonymous_id</td>
                    <td>Atlassian</td>
                    <td>
                      Used to to track new and returning visitors and count how
                      many people visit the Site.
                    </td>
                  </tr>

                  <tr>
                    <td>_csrf</td>
                    <td>Atlassian</td>
                    <td>
                      Helps prevent XSRF attacks. Ensures that during a user's
                      session, browser requests sent to a JIRA server originated
                      from that JIRA server.
                    </td>
                  </tr>
                  {/* </tbody> */}
                </table>
              </section>
              <section>
                <b>4. Your rights with regard to your data</b>
                <p>
                  You have the right to inspect, rectify, limit and delete
                  personal data. You also have the right to object to the
                  processing of personal data and the right to data portability.
                  You can exercise these rights by sending us an email at
                  kirjaamo.um@formin.fi. To prevent abuse, we may ask you to
                  identify yourself adequately. When it comes to access to
                  personal data linked to a cookie, we ask you to send a copy of
                  the cookie in question. You can find this in the settings of
                  your browser. MFA will edit the text, with a link to
                  <a href="https://um.fi/dataprotection">
                    https://um.fi/dataprotection
                  </a>
                </p>
              </section>
              <section>
                <b>5. Block and delete cookies</b>
                <p>
                  You can easily block and delete cookies yourself at any time
                  via your internet browser. You can also set your internet
                  browser so that you receive a message when a cookie is placed.
                  You can also indicate that certain cookies may not be placed.
                  View the help function of your browser for this option. If you
                  delete the cookies in your browser, this may have consequences
                  for the pleasant use of this website. Please be aware that if
                  you do not want cookies, our website will not work properly.
                  Some functions of the site may be lost or you may not be able
                  to visit the website at all. In addition, refusing cookies
                  does not mean that you will no longer see advertisements at
                  all. The advertisements are then no longer tailored to your
                  interests and can therefore be repeated more often. How you
                  can adjust your settings differs per browser. If necessary,
                  consult the help function of your browser, or click on one of
                  the icons below to go directly to the manual of your browser.
                  <ul>
                    <li>
                      Firefox:
                      <a href="https://support.mozilla.org/nl/kb/cookies-verwijderen-data-wissen-websites-stored">
                        https://support.mozilla.org/nl/kb/cookies-verwijderen-data-wissen-websites-stored
                      </a>
                    </li>
                    <li>
                      Google Chrome:
                      <a href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform=Desktop&hl=en">
                        https://support.google.com/chrome/answer/95647?co=GENIE.Platform=Desktop&hl=en
                      </a>
                    </li>
                    <li>
                      Internet Explorer:
                      <a href="https://support.microsoft.com/en-gb/kb/278835">
                        https://support.microsoft.com/en-gb/kb/278835
                      </a>
                    </li>
                    <li>
                      Safari on smart phone:
                      <a href="https://support.apple.com/en-gb/HT20126">
                        https://support.apple.com/en-gb/HT20126
                      </a>
                    </li>
                    <li>
                      Safari on Mac:
                      <a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac">
                        https://support.apple.com/en-gb/guide/safari/sfri11471/mac
                      </a>
                    </li>
                  </ul>
                </p>
              </section>
              <section>
                <b>6. New developments and unforeseen cookies</b>
                <p>
                  The texts of our website can be adjusted at any time due to
                  continuous developments. This also applies to our cookie
                  statement. Please read this statement regularly to keep up to
                  date with any changes. It is also possible that cookies are
                  placed via our websites by others, of which we are not always
                  aware. Do you encounter unforeseen cookies on our website that
                  you cannot find in our overview? Let us know via
                  kirjaamo.um@formin.fi. You can also contact the third party
                  directly and ask which cookies they placed, what the reason
                  is, what the lifespan of the cookie is and how they have
                  guaranteed your privacy.
                </p>
              </section>
              <section>
                <b>7. Concluding remarks</b>
                <p>
                  We will have to adjust these statements from time to time, for
                  example when we adjust our website or change the rules
                  surrounding cookies. You can consult this webpage for the
                  latest version. If you have any questions and / or comments,
                  please contact
                  <a href="mailto:kirjaamo.um@formin.fi">
                    kirjaamo.um@formin.fi
                  </a>
                  <br />
                  <br />
                </p>
                20 April 2021
              </section>
            </Typography>
          </article>
        </Grid>
      </ModuleContainer>
    </>
  );
};
