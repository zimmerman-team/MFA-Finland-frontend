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
  FormControl,
  Grid,
  Hidden,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { PillButton } from "app/components/Buttons/PillButton";
import { PrimaryColor } from "app/theme";

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

export const styles = {
  container: css`
    width: 100%;
    padding: 28px;
    background-color: white;
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.12);
    border-radius: 30px;
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
  button: css`
    display: flex;
    margin-left: auto;
    margin-top: 12px;
    margin-bottom: 12px;
    border-radius: 20px;
    text-transform: unset;
    padding: 10px 32px;
    line-height: 17px;
    :hover {
      background-color: ${PrimaryColor[3]};
    }
  `,
};

export const FeedbackLayout = () => {
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

  function handleSend() {
    if (feedback && name && email && validateEmail()) {
      setFeedbackError(false);
      setNameError(false);
      setEmailError(false);
      setEmailErrorMsg("This field is required");
      // Do request
    }
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
  }

  function validateEmail() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const faqMockItem = {
    title: "1. What is the .....?",
    paragraph:
      "Lorem Ipsum is simply dummy text of the printing and typesetting\n" +
      "industry. Lorem Ipsum has been the industry's standard dummy text\n" +
      "ever since the 1500s, when an unknown printer took a galley of\n" +
      "type and scrambled it to make a type specimen book. It has\n" +
      "survived not only five centuries, but also the leap into\n" +
      "electronic typesetting, remaining essentially",
  };
  const faqMockList = [];
  for (let i = 0; i < 6; i++) {
    faqMockList.push(faqMockItem);
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
            <Typography variant="h5">FAQs</Typography>
            <Box width="100%" height="24px" />

            {faqMockList.map((item: any) => {
              return (
                <>
                  <Typography variant="subtitle1" css={styles.paragraphHeader}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" css={styles.paragraph}>
                    {item.paragraph}
                  </Typography>
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
            <Typography variant="h5">Feedback</Typography>
            <Box width="100%" height="24px" />
            <Typography variant="body2">* Required</Typography>
            <Box width="100%" height="24px" />

            <Field
              value={feedback}
              label="Feedback*"
              handleChange={handleFeedbackChange}
              error={feedbackError}
              errorMessage="This field is required"
              isMultiline
            />

            <Field
              value={name}
              label="Name*"
              handleChange={handleNameChange}
              error={nameError}
              errorMessage="This field is required"
            />

            <Field
              value={email}
              label="Email*"
              handleChange={handleEmailChange}
              error={emailError}
              errorMessage={emailErrorMsg}
            />

            <Field
              value={other}
              label="or other contact information"
              handleChange={handleOtherChange}
              error={false}
            />

            <Field
              value={organisation}
              label="Organisation"
              handleChange={handleOrganisationChange}
              error={false}
            />

            <PillButton css={styles.button} onClick={() => handleSend()}>
              Send
            </PillButton>
          </div>
        </Grid>
      </ModuleContainer>
    </>
  );
};

interface FieldProps {
  label: string;
  value: string;
  error: boolean;
  // eslint-disable-next-line react/require-default-props
  errorMessage?: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  // eslint-disable-next-line react/require-default-props
  isMultiline?: boolean;
}
const Field = (props: FieldProps) => {
  const fieldStyles = {
    container: css`
      margin-bottom: 16px;
    `,
    label: css`
      margin-bottom: 4px;
    `,
    error: css`
      margin-top: 8px;
      color: #ae4764;
    `,
    fieldset: css`
      ${props.error &&
      `
            && > fieldset {
        border-color: #ae4764 !important;
        background-color: #edd2da;
      }
            `}
    `,
  };
  return (
    <FormControl
      variant="outlined"
      fullWidth
      hiddenLabel
      css={fieldStyles.container}
    >
      <label htmlFor={props.label} css={fieldStyles.label}>
        {props.label}
      </label>
      <OutlinedInput
        id={props.label}
        value={props.value}
        rows={4}
        onChange={(e) => props.handleChange(e)}
        error={props.error}
        multiline={props.isMultiline}
        css={fieldStyles.fieldset}
      />
      {props.error && (
        <Typography variant="subtitle2" css={fieldStyles.error}>
          {props.errorMessage}
        </Typography>
      )}
    </FormControl>
  );
};
