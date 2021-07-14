import React from "react";
import { useScript } from "app/hooks/useScripts";

export const ThirdPartyScripts = () => {
  useScript("../../third-part-scripts/matomo.js");
  useScript(
    `https://zimmermanzimmerman.atlassian.net/${process.env.REACT_APP_ISSUE_COLLECTOR_URI}`
  );

  return <></>;
};
