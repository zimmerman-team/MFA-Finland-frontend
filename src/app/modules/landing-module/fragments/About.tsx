import React from "react";
import { LandingCard, LandingCardProps } from "../common/LandingCard";
import Typography from "@material-ui/core/Typography";

interface AboutProps {}

export const landingCardProps: LandingCardProps = {
  title: "About",
  marginBottomTitle: 32,
  height: 484,
};

export const About = (props: AboutProps) => {
  return (
    <LandingCard {...landingCardProps}>
      <Typography
        variant="body2"
        color="secondary"
        css={"line-height: 17px; letter-spacing: unset;"}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially{" "}
      </Typography>
    </LandingCard>
  );
};
