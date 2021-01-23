import React from "react";
import { LandingCard, LandingCardProps } from "../common/LandingCard";

interface BudgetLinesProps {}

export const landingCardProps: LandingCardProps = {
  title: "Budget Lines",
  tooltip: "Lorem ipsum dolor sit amet",
  marginBottomTitle: 26,
};

export const BudgetLines = (props: BudgetLinesProps) => {
  return (
    <LandingCard {...landingCardProps}>
      <div>content goes here</div>
    </LandingCard>
  );
};
