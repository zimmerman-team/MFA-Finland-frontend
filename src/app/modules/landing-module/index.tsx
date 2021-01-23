/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
/* project */
import { LandingLayout } from "./layout";

export default function Landing() {
  useTitle(`Project - Home`);
  return <LandingLayout />;
}
