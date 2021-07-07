import React from "react";
import { css } from "styled-components/macro";
import { Anchor, InPageNavigation } from "app/components/InPageNavigation";
import { InpageNavItemModel } from "app/components/InPageNavigation/model";
import { Breadcrumbs } from "app/components/Breadcrumb";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { Path } from "app/const/Path";
import { ModuleContainer } from "app/components/ModuleContainer";
import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  Hidden,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { PillButton } from "app/components/Buttons/PillButton";
import { PrimaryColor } from "app/theme";
import { styles } from "app/modules/feedback-module/styles";
import { FormField } from "app/modules/feedback-module/common/FormField";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import get from "lodash/get";
import { initActivityDetailData } from "app/components/ActivityAccordion/model";
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

  const [active, setActive] = React.useState(0);
  const [feedback, setFeedback] = React.useState("");
  const [feedbackError, setFeedbackError] = React.useState(false);
  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = React.useState(
    "This field is required"
  );
  const [other, setOther] = React.useState("");
  const [organisation, setOrganisation] = React.useState("");
  const [displaySucces, setDisplaySuccess] = React.useState(false);
  const [displayError, setDisplayError] = React.useState();

  const feedbackSendResponse = useStoreState((state) => {
    return state.feedback;
  });

  const feedbackSendAction = useStoreActions(
    (actions) => actions.feedback.fetch
  );
  const clearAction = useStoreActions((actions) => actions.feedback.clear);

  const loading = useStoreState((state) => state.feedback.loading);

  React.useEffect(() => {
    if (
      feedbackSendResponse &&
      // @ts-ignore
      feedbackSendResponse.data?.status === "success"
    ) {
      setDisplaySuccess(true);
    }
  }, [feedbackSendResponse]);

  React.useEffect(() => {
    clearAction();
  }, []);

  function handleClick(id: any) {
    setActive(parseInt(id, 10));
  }

  function handleFeedbackChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFeedbackError(false);
    setFeedback(event.target.value);
  }

  function handleNameChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setNameError(false);
    setName(event.target.value);
  }

  function handleEmailChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setEmailError(false);
    setEmail(event.target.value);
  }

  function handleOtherChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setOther(event.target.value);
  }

  function handleOrganisationChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setOrganisation(event.target.value);
  }

  function validateForm() {}

  function handleSend() {
    if (!feedback) {
      setFeedback("");
      setFeedbackError(true);
    }
    if (!name) {
      setName("");
      setNameError(true);
    }
    if (!email) {
      setEmail("");
      setEmailError(true);
    }
    if (!validateEmail()) {
      setEmail("");
      setEmailError(true);
      setEmailErrorMsg("Please provide a correct e-mail address");
    }

    if (feedback && name && email && validateEmail()) {
      setFeedbackError(false);
      setNameError(false);
      setEmailError(false);
      setEmailErrorMsg("This field is required");

      // Do request
      feedbackSendAction({
        values: {
          name,
          // @ts-ignore
          email,
          feedback,
          other,
          organisation,
        },
      });
    }
  }

  function validateEmail() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const faqItems = get(cmsData, "pages.faq.items", []);

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
          <div css={styles.container}>
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
          </div>
        </Grid>
        <Hidden mdDown>
          <Grid item lg={3} />
        </Hidden>
        <Grid item xl={9} lg={9} md={12} css={styles.gridContainer}>
          <Anchor id="feedback" />
          <div css={styles.container}>
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
            {/* {loading && ( */}
            {/*  <div css={styles.loading}> */}
            {/*    <CircularProgress /> */}
            {/*  </div> */}
            {/* )} */}

            {/* {!loading && !displaySucces && ( */}
            {/*  <> */}
            {/*    <Typography variant="h5">Feedback</Typography> */}
            {/*    <Box width="100%" height="24px" /> */}
            {/*    <Typography variant="body2">* Required</Typography> */}
            {/*    <Box width="100%" height="24px" /> */}

            {/*    <FormField */}
            {/*      value={feedback} */}
            {/*      label="Feedback*" */}
            {/*      handleChange={handleFeedbackChange} */}
            {/*      error={feedbackError} */}
            {/*      errorMessage="This field is required" */}
            {/*      isMultiline */}
            {/*    /> */}

            {/*    <FormField */}
            {/*      value={name} */}
            {/*      label="Name*" */}
            {/*      handleChange={handleNameChange} */}
            {/*      error={nameError} */}
            {/*      errorMessage="This field is required" */}
            {/*    /> */}

            {/*    <FormField */}
            {/*      value={email} */}
            {/*      label="Email*" */}
            {/*      handleChange={handleEmailChange} */}
            {/*      error={emailError} */}
            {/*      errorMessage={emailErrorMsg} */}
            {/*    /> */}

            {/*    <FormField */}
            {/*      value={other} */}
            {/*      label="or other contact information" */}
            {/*      handleChange={handleOtherChange} */}
            {/*      error={false} */}
            {/*    /> */}

            {/*    <FormField */}
            {/*      value={organisation} */}
            {/*      label="Organisation" */}
            {/*      handleChange={handleOrganisationChange} */}
            {/*      error={false} */}
            {/*    /> */}

            {/*    <PillButton css={styles.button} onClick={() => handleSend()}> */}
            {/*      Send */}
            {/*    </PillButton> */}
            {/*  </> */}
            {/* )} */}

            {/* {displaySucces && ( */}
            {/*  <> */}
            {/*    <Typography variant="h5"> */}
            {/*      Thank you for your feedback */}
            {/*    </Typography> */}
            {/*    <Box width="100%" height="24px" /> */}
            {/*    <Typography variant="body1" css={styles.paragraph}> */}
            {/*      Lorem ipsum dolor sit amet, consectetur adipisicing elit. */}
            {/*      Dolore, dolores maxime neque odio optio pariatur perspiciatis */}
            {/*      quam voluptatem. Assumenda dolor error eum facilis ipsa */}
            {/*      nostrum quod. Ab aliquid sed voluptatem. */}
            {/*    </Typography> */}
            {/*  </> */}
            {/* )} */}
          </div>
        </Grid>
      </ModuleContainer>
    </>
  );
};
