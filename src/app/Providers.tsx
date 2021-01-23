// cc:application base#;application providers
import React, { ReactNode } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "app/theme";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Container, StylesProvider, CssBaseline } from "@material-ui/core";

type ProviderProps = {
  children?: ReactNode;
};

function Providers(props: ProviderProps) {
  return (
    /* material ui theme provider */
    <RecoilRoot>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* react router */}
          <Router>{props.children}</Router>
        </ThemeProvider>
      </StylesProvider>
    </RecoilRoot>
  );
}

export default Providers;
