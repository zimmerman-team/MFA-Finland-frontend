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

type ProviderProps = {
  children?: React.ReactNode;
};

function Providers(props: ProviderProps) {
  return (
    /* material ui theme provider */
    <RecoilRoot>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <StoreProvider store={store}>
            <AppContainer>
              <Container
                maxWidth="lg"
                css={`
                  min-height: 100%;
                  padding: 0 32px;

                  @media (max-width: 992px) {
                    padding: 0;
                  }
                `}
              >
                <Router>{props.children}</Router>
              </Container>
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
