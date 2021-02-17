import React from "react";
import { ModuleRoutes } from "app/Routes";
import { AppBar } from "app/components/AppBar";
import { Drawer } from "app/components/Drawer";
import { CookieDialog } from "app/components/CookieDialog";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { languageAtom } from "app/state/recoil/atoms";
import { FilterBar } from "./components/FilterBar";
import { FilterPanel } from "./components/FilterPanel";
import { PageOrnament } from "app/assets/PageOrnament";

export const App = () => {
  const { i18n } = useTranslation();

  const [currentLanguage, setLanguage] = useRecoilState(languageAtom);

  React.useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, []);
  return (
    <React.Fragment>
      <AppBar />
      <FilterBar />
      <FilterPanel />
      <Drawer />
      <ModuleRoutes />
      <CookieDialog
        data-testid="cookie-dialog"
        message="The website uses cookies for tracking statistics. Read Grand Bargains data privacy for more details."
        open
      />
      <PageOrnament />
    </React.Fragment>
  );
};
