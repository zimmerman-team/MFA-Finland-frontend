import React from "react";
import styled from "styled-components";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { PillButton } from "app/components/Buttons/PillButton";
import { PrimaryColor } from "app/theme";

const MessageContainer = styled((props) => <Box {...props} />)`
  align-items: center;
  // border: 1px red solid;
  @media (max-width: 960px) {
    flex-direction: column;
    align-items: normal;
  }
`;

const Copy = styled((props) => <Typography {...props} />)`
  && {
    margin-right: 32px;
    align-self: center;
    @media (max-width: 960px) {
      margin-bottom: 16px;
      margin-right: 0;
      text-align: center;
      line-height: 22px;
    }
  }
`;

const Button = styled((props) => <PillButton {...props} />)`
  border-radius: 20px;
  text-transform: unset;
  padding: 9px 16px;
  line-height: 17px;
  :hover {
    background-color: ${PrimaryColor[3]};
  }
  :first-of-type {
    margin-right: 16px;
  }

  @media (max-width: 960px) {
    max-width: 74px;
  }
`;

const HyperLink = styled((props) => <Link {...props} />)`
  text-decoration: underline;
`;

const Buttons = styled.div`
  display: flex;
  align-self: center;
`;

type MessageProps = {
  handleAccept: () => void;
  handleReject: () => void;
};

export const Message = (props: MessageProps) => {
  return (
    <MessageContainer display="flex">
      <Copy variant="body1">
        The website makes use of{" "}
        <HyperLink to="/about#cookie">cookies</HyperLink>. Review{" "}
        <HyperLink to="/about#privacy">data privacy</HyperLink> for more
        details.
      </Copy>
      <Buttons>
        <Button test-id="main-page-reject" onClick={() => props.handleReject()}>
          Reject
        </Button>
        <Button test-id="main-page-accept" onClick={() => props.handleAccept()}>
          Accept
        </Button>
      </Buttons>
    </MessageContainer>
  );
};
