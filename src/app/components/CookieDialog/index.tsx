import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import styled from "styled-components/macro";

import useCookie from "@devhammed/use-cookie";
import { Message } from "./common/message";

const BaseSnackbar = styled((props) => <Snackbar {...props} />)`
  && {
    bottom: 0;
  }

  & [class*="MuiSnackbarContent-root"] {
    background-color: white;
    width: 1232px;
    border-radius: 2px;
    box-shadow: 0 8px 17px -4px rgba(130, 142, 148, 0.35),
      0 0 4px 0 rgba(130, 142, 148, 0.16), 0 0 2px 0 rgba(130, 142, 148, 0.12);
    flex-wrap: nowrap;
    padding: 0 32px;
    display: flex;
    justify-content: center;
  }

  & [class*="MuiSnackbarContent-message"] {
    padding-left: 0;
    padding-top: 16px;
    padding-bottom: 16px;
  }

  & [class*="MuiSnackbarContent-action"] {
    padding-left: 64px;
  }
`;

export const CookieDialog = () => {
  const [userConsent, setUserConsent, deleteUserConsent] = useCookie(
    "userConsent",
    false
  );
  const [visible, setVisibility] = useState(true);

  // This useEffect makes sure the dialog is not displayed when a user revisits the site and has already accepted the cookie.
  React.useEffect(() => {
    if (userConsent === true) {
      setVisibility(false);
    }
  }, [userConsent]);

  const handleAccept = () => {
    setUserConsent(true, {
      expires: 31556926, // 12 months
      domain: "",
      path: "",
      secure: false,
      httpOnly: false,
      maxAge: 0,
      sameSite: "",
    });
    setVisibility(false);
  };

  const handleReject = () => {
    deleteUserConsent();
    setVisibility(false);
  };

  return (
    <>
      {visible && (
        <BaseSnackbar
          data-testid="cookie-dialog"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={visible}
          autoHideDuration={null}
        >
          <SnackbarContent
            aria-describedby="client-snackbar"
            message={
              <Message
                handleAccept={handleAccept}
                handleReject={handleReject}
              />
            }
          />
        </BaseSnackbar>
      )}
    </>
  );
};
