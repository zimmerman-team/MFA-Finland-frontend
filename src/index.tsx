/// <reference types="styled-components/cssprop" />

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "app/languages";

import reportWebVitals from "reportWebVitals";
// this import looks unused; it isn't so please do not remove
// eslint-disable-next-line @typescript-eslint/no-unused-vars,import/no-unresolved
import * as _ from "styled-components/cssprop";
import Providers from "app/Providers";
import { App } from "app";
import { Sunburstoe } from "app/components/Charts/sunburst/Test";

ReactDOM.render(
  <Providers>
    {/* <App /> */}
    <Sunburstoe />
  </Providers>,
  document.getElementById("root")
);

reportWebVitals();
