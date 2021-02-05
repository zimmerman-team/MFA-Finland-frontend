//@ts-nocheck
import {
  Box,
  Paper,
  Card,
  Typography,
  AccordionProps,
} from "@material-ui/core";
import { Button, LinearProgress, TextField } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Breadcrumbs } from "app/components/Breadcrumb";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { GridWidget } from "app/components/GridWidget";
import { ModuleContainer } from "app/components/ModuleContainer";
import { Path } from "app/const/Path";
import { Field, Form, Formik } from "formik";
import { TextFieldProps } from "formik-material-ui";
import React from "react";
import { css } from "styled-components/macro";

interface Values {
  feedback: string;
  name: string;
  email: string;
  misc: string;
  organisation: string;
}
const MfaTextField = (props: TextFieldProps) => {
  return <TextField {...props} fullWidth variant="outlined" />;
};

const MfaTextFieldFull = (props: TextFieldProps) => {
  return (
    <TextField {...props} multiline rows={5} fullWidth variant="outlined" />
  );
};

const widgetContainer = (height: string | undefined, isHovered: boolean) => css`
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 32px;
  flex-direction: column;
  background-color: #ffffff;
  /* padding: 24px 32px 32px 32px; */

  padding: 32px;
  height: ${height || "328px"};
  box-shadow: ${isHovered
    ? "0 3px 6px rgba(46, 73, 130, 0.16), 0 3px 6px rgba(46, 73, 130, 0.23);"
    : ""};
  transition: box-shadow 0.3s ease-in-out;
`;

const gridSetting = {
  item: true,
  xs: 12,
  sm: 12,
  md: 12,
  lg: 12,
};

const FaqList: AccordionProps[] = [
  {
    label: "The data of my organisation is not correct. How can I change it?",
    content:
      'The map and tables show the data your organisation published through IATI. If your organisation’s IATI publication is not fully accurate you will indeed see that reflected here. We can advise you on your IATI publication so your IATI publication will provide an accurate image of your organisation’s activities. <a href="contact">Contact us</a>.',
  },

  {
    label: "What is an activity?",
    content:
      "An activity is the IATI name given to any piece of work an organisation does. ",
  },
  {
    label: "What is an organisation?",
    content:
      "An organisation involved with the activity. This may be a donor, fund, agency, etc.",
  },
  {
    label: "What is a publisher?",
    content:
      "The reporting organisation that published the information to the IATI standard. A reporting organisation may provide information on its own activities, as well as reporting on behalf of other organisations involved in the delivery of aid.",
  },
  {
    label: "What is a donor?",
    content:
      "The organisation providing the money for the transaction. An organisation that receives money from one donor and then passes it on to another partner organisation is therefore both receiver and donor.",
  },
  {
    label: "How and in what format can I download datasets?",
    content:
      "In the table view of the data, click the cloud icon in the top right corner of the table. This will allow you to download the current selection in CSV format.",
  },
];

export const crumbs: BreadcrumbLinkModel[] = [
  { label: "Homepage", path: Path.home },
  { label: "Feedback" },
];

export const questionAnswer = () => {
  return (
    <React.Fragment>
      <div
        css={`
          font-family: Finlandica;
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 19px;
          color: #2e4982;
        `}
      >
        What is the?
      </div>
      <div
        css={`
          font-family: Finlandica;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 19px;
          color: #2e4982;
        `}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially{" "}
      </div>
    </React.Fragment>
  );
};

export const FeedbackModuleLayout = () => {
  return (
    <ModuleContainer>
      <Grid item lg={12}>
        <Breadcrumbs route={crumbs} />
      </Grid>

      <Grid item lg={3}>
        <div
          css={`
            width: 100%;
            height: 400px;
            /* background-color: red; */
            border-radius: 32px;
          `}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={9}>
        <div css={widgetContainer}>
          <Grid {...gridSetting}>
            <Typography>FAQ</Typography>
          </Grid>
          <Grid {...gridSetting}></Grid>
        </div>
        <Box width="100%" height="24px" />
        <div css={widgetContainer}>
          <Formik
            initialValues={{
              feedback: "",
              name: "",
              email: "",
              misc: "",
              organisation: "",
            }}
            validate={(values) => {
              const errors: Partial<Values> = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                alert(JSON.stringify(values, null, 2));
              }, 500);
            }}
          >
            {({ submitForm, isSubmitting }) => (
              <Form>
                <Grid {...gridSetting}>
                  <Field
                    component={MfaTextFieldFull}
                    name="feedback"
                    type="feedback"
                    label="Feedback"
                  />
                </Grid>
                <Box width="100%" height="24px" />
                <Grid {...gridSetting}>
                  <Field
                    component={MfaTextField}
                    name="name"
                    type="name"
                    label="Name"
                  />
                </Grid>
                <Box width="100%" height="24px" />
                <Grid {...gridSetting}>
                  <Field
                    component={MfaTextField}
                    name="email"
                    type="email"
                    label="E-mail"
                  />
                </Grid>
                <Box width="100%" height="24px" />
                <Grid {...gridSetting}>
                  <Field
                    component={MfaTextField}
                    name="misc"
                    type="misc"
                    label="Or other contact information"
                  />
                </Grid>
                <Box width="100%" height="24px" />

                <Grid {...gridSetting}>
                  <Field
                    component={MfaTextField}
                    name="organisation"
                    type="organisation"
                    label="Organisation"
                  />
                </Grid>
                <Box width="100%" height="24px" />
                {isSubmitting && <LinearProgress />}
                <Box width="100%" height="24px" />
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Send
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Grid>
    </ModuleContainer>
  );
};
