import { Box } from "@material-ui/core";
import { Button, LinearProgress, TextField } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { ModuleContainer } from "app/components/ModuleContainer";
import { Field, Form, Formik } from "formik";
import { TextFieldProps } from "formik-material-ui";
import React from "react";

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

const gridSetting = {
  item: true,
  xs: 12,
  sm: 12,
  md: 12,
  lg: 6,
};
export const FeedbackModuleLayout = () => {
  return (
    <ModuleContainer>
      <Grid item xs={12} sm={12} md={12} lg={12}>
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
      </Grid>
    </ModuleContainer>
  );
};
