import React from "react";
import { useScript } from "app/hooks/useScripts";

export const ThirdPartyScripts = () => {
  useScript("/matomo.js");

  return <></>;
};
