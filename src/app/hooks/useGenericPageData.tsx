import React from "react";
import { useCMSCollections } from "app/hooks/useCMSCollections";
import { Path } from "app/const/Path";
import { GenericPageModuleProps } from "app/modules/generic-page-module/interface";

export function useGenericPageData(
  module: "about" | "feedback" | "statements" | "results"
): GenericPageModuleProps {
  const cards: any[] = [];
  const [data, setData] = React.useState<GenericPageModuleProps>({
    helmetTitle: module,
    breadcrumbs: [],
    cards,
  });

  const cmsCollectionsData = useCMSCollections({ returnData: true });

  const createBreadcrumbs = () => {
    return [
      { label: "Homepage", path: Path.home, cmsKey: "breadcrumbs.homepage" },
      { label: module, cmsKey: `breadcrumbs.${module}` },
    ];
  };

  React.useEffect(() => {
    setData((prevState) => {
      return {
        ...prevState,
        breadcrumbs: createBreadcrumbs(),
        cards: cmsCollectionsData[module],
      };
    });
  }, [cmsCollectionsData]);

  return data;
}
