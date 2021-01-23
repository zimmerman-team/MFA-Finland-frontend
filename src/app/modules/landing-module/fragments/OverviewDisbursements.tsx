import React from "react";
import { LandingCard, LandingCardProps } from "../common/LandingCard";

interface OverviewDisbursementsProps {}

const landingCardProps: LandingCardProps = {
  title: "Overview Disbursements",
  marginBottomTitle: 56,
};

export const OverviewDisbursements = (props: OverviewDisbursementsProps) => {
  return (
    <LandingCard {...landingCardProps}>
      <div>content goes here</div>
    </LandingCard>
  );
};
