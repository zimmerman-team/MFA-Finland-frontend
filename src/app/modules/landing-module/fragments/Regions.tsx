import React from "react";
import { LandingCard, LandingCardProps } from "../common/LandingCard";

interface RegionsProps {}

export const landingCardProps: LandingCardProps = {
  title: "Regions",
  tooltip: "Lorem ipsum dolor sit amet",
  marginBottomTitle: 49,
};

export const Regions = (props: RegionsProps) => {
  return (
    <LandingCard {...landingCardProps}>
      <div>content goes here</div>
    </LandingCard>
  );
};
