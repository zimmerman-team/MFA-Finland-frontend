import React from "react";
import { LandingCard, LandingCardProps } from "../common/LandingCard";

interface ResultProps {}

const resultCardProps: LandingCardProps = {
  title: "Result",
  tooltip: "Lorem ipsum dolor sit amet",
  marginBottomTitle: 32,
};

export const Result = (props: ResultProps) => {
  return (
    <LandingCard {...resultCardProps}>
      <div>content goes here</div>
    </LandingCard>
  );
};
