import React from "react";
import { LandingCard, LandingCardProps } from "../common/LandingCard";

interface ThematicAreasProps {}

const landingCardProps: LandingCardProps = {
  title: "Thematic areas",
  tooltip: "Lorem ipsum dolor sit amet",
  marginBottomTitle: 40,
};

export const ThematicAreas = (props: ThematicAreasProps) => {
  return (
    <LandingCard {...landingCardProps}>
      <div>content goes here</div>
    </LandingCard>
  );
};
