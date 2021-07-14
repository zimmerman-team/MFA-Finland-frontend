import React from "react";
import useTitle from "react-use/lib/useTitle";
import { getAppName } from "app/const/Path";
import { AboutModuleLayout } from "app/modules/about-module/layout";
import { useRecoilState } from "recoil";
import { languageAtom } from "app/state/recoil/atoms";
import { useCMSCollections } from "app/hooks/useCMSCollections";

const moduleName = "About";

export function AboutModule() {
  const [currentLanguage, _] = useRecoilState(languageAtom);
  const cmsCollectionsData = useCMSCollections({ returnData: true });
  useTitle(`${moduleName} | ${getAppName(currentLanguage)}`);
  return <AboutModuleLayout data={cmsCollectionsData.about} />;
}
