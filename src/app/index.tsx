import React from "react";
import { ModuleRoutes } from "app/Routes";
import { AppBar } from "app/components/AppBar";
import { Drawer } from "app/components/Drawer";
import { CookieDialog } from "app/components/CookieDialog";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { languageAtom } from "app/state/recoil/atoms";
import { PrimaryColor } from "app/theme";

export const App = () => {
  const { i18n } = useTranslation();

  const [currentLanguage, setLanguage] = useRecoilState(languageAtom);

  React.useEffect(() => {
    i18n
      .changeLanguage(currentLanguage)
      .then(() => console.info("yey, language has been set"));
  }, []);
  return (
    <>
      <AppBar />
      <div
        css={`
          position: sticky;
          top: 64px;
          margin-bottom: 16px;
          height: 64px;
          display: flex;
          justify-content: center;
          background-color: #ecf1fa;
          z-index: 2;
        `}
      />
      <div
        // todo: move elsewhere
        css={`
          z-index: -1;
          top: 64px;
          left: 0;
          position: fixed;
          background-color: #ecf1fa;
          height: 64px;
          width: 100vw;
        `}
      />

      <Drawer />
      <ModuleRoutes />
      {/*<AppDialogs />*/}
      <CookieDialog
        data-testid="cookie-dialog"
        message="The website uses cookies for tracking statistics. Read Grand Bargains data privacy for more details."
        open
      />
      {/*  <Filter openSearch={false} />*/}
    </>
  );
};
