/// <reference types="styled-components/cssprop" />

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// @ts-ignore
import { App } from "app";
import reportWebVitals from "reportWebVitals";
// this import looks unused; it isn't so please do not remove
// eslint-disable-next-line @typescript-eslint/no-unused-vars,import/no-unresolved
import * as _ from "styled-components/cssprop";

ReactDOM.render(<App />, document.getElementById("root"));

reportWebVitals();
