// cc:application base#;application providers
import React from "react";
import theme from "app/theme";
import { RecoilRoot } from "recoil";
import { store } from "app/state/store";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
import { PageLoader } from "app/modules/common/page-loader";
import { StoreProvider, useStoreRehydrated } from "easy-peasy";
import { Container, StylesProvider, CssBaseline } from "@material-ui/core";
import { AppBar } from "app/components/AppBar";
import { FilterBar } from "app/components/FilterBar";
import useCookie from "@devhammed/use-cookie";
import { ThirdPartyScripts } from "app/third-party-scripts/Scripts";

type ProviderProps = {
  children?: any;
};

function Providers(props: ProviderProps) {
  const [userConsent] = useCookie("userConsent", "false");

  return (
    /* material ui theme provider */
    <RecoilRoot>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          {userConsent && <ThirdPartyScripts />}
          <CssBaseline />
          <StoreProvider store={store}>
            <AppContainer>
              <Router>
                <AppBar />
                <FilterBar />
                <div
                  css={`
                    display: flex;
                    justify-content: center;
                  `}
                >
                  <Container
                    maxWidth="lg"
                    css={`
                      //min-height: 100%;
                      padding: 0 32px;
                      margin-left: unset;
                      margin-right: unset;

                      @media (max-width: 992px) {
                        padding: 0;
                      }
                    `}
                  >
                    {props.children}
                  </Container>
                </div>
              </Router>
            </AppContainer>
          </StoreProvider>
        </ThemeProvider>
      </StylesProvider>
    </RecoilRoot>
  );
}

export default Providers;

function AppContainer(props: ProviderProps) {
  const isRehydrated = useStoreRehydrated();
  if (!isRehydrated) {
    return <PageLoader />;
  }
  return <React.Fragment>{props.children}</React.Fragment>;
}
