import React from "react";
import { LandingCard, LandingCardProps } from "../common/LandingCard";

interface MapProps {}

export const landingCardProps: LandingCardProps = {
  title: "Map",
  marginBottomTitle: 67,
  height: 680,
};

export const Map = (props: MapProps) => {
  return (
    <LandingCard {...landingCardProps}>
      <div>content goes here</div>
    </LandingCard>
  );
};
