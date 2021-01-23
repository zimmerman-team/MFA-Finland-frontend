import React from "react";
import { LandingCard, LandingCardProps } from "../common/LandingCard";

interface OrganisationsProps {}

const landingCardProps: LandingCardProps = {
  title: "Organisations",
  tooltip: "Lorem ipsum dolor sit amet",
  marginBottomTitle: 49,
};

export const Organisations = (props: OrganisationsProps) => {
  return (
    <LandingCard {...landingCardProps}>
      <div>content goes here</div>
    </LandingCard>
  );
};
