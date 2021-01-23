import React from "react";
import { LandingCard, LandingCardProps } from "../common/LandingCard";

interface SdgsProps {}

export const landingCardProps: LandingCardProps = {
  title: "SDGs",
  tooltip: "Lorem ipsum dolor sit amet",
  marginBottomTitle: 32,
  height: 484,
};

export const Sdgs = (props: SdgsProps) => {
  return (
    <LandingCard {...landingCardProps}>
      <div>content goes here</div>
    </LandingCard>
  );
};
