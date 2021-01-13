import React from "react";
import Providers from "app/Providers";
import { ModuleRoutes } from "app/Routes";
import { AppBar } from "app/components/AppBar";
import { Drawer } from "app/components/Drawer";
// import { AppDialogs } from "app/components/Dialogs";
import { CookieDialog } from "app/components/CookieDialog";

export function App() {
  return (
    <Providers>
      <AppBar />
      <Drawer />
      <ModuleRoutes />
      {/*<AppDialogs />*/}
      <CookieDialog
        data-testid="cookie-dialog"
        message="The website uses cookies for tracking statistics. Read Grand Bargains data privacy for more details."
        open
      />
      {/*  <Filter openSearch={false} />*/}
    </Providers>
  );
}
