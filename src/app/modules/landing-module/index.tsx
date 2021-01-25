/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
import { LandingLayout } from "app/modules/landing-module/layout";
/* project */

export default function Landing() {
  useTitle(`Project - Home`);

  return <LandingLayout />;
}
