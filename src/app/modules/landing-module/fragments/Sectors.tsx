import React from "react";
import { LandingCard, LandingCardProps } from "../common/LandingCard";

interface SectorsProps {}

const landingCardProps: LandingCardProps = {
  title: "Sectors",
  tooltip: "Lorem ipsum dolor sit amet",
  marginBottomTitle: 42,
};

export const Sectors = (props: SectorsProps) => {
  return (
    <LandingCard {...landingCardProps}>
      <div>content goes here</div>
    </LandingCard>
  );
};
