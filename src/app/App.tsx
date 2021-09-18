import React from "react";
import { ModuleRoutes } from "app/Routes";
import { Drawer } from "app/components/Drawer";
import { CookieDialog } from "app/components/CookieDialog";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { languageAtom } from "app/state/recoil/atoms";
import { PageOrnament } from "app/assets/PageOrnament";
import ScrollToTop from "app/utils/scrollToTop";
import { MetaTags } from "app/utils/MetaTags";
import { FilterPanel } from "./components/FilterPanel";
import { MdBottomMenu } from "./components/MdBottomMenu";

export const App = () => {
  const { i18n } = useTranslation();

  const [currentLanguage] = useRecoilState(languageAtom);

  React.useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, []);

  return (
    <React.Fragment>
      <MetaTags />
      <ScrollToTop />
      <FilterPanel />
      <Drawer />
      <MdBottomMenu />
      <PageOrnament />
      <ModuleRoutes />
      <CookieDialog />
    </React.Fragment>
  );
};
