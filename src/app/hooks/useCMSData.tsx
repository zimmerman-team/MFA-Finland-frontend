import React from "react";
import get from "lodash/get";
import { useRecoilState } from "recoil";
import { useUpdateEffect } from "react-use";
import { cmsDataAtom, languageAtom } from "app/state/recoil/atoms";
import { useStoreActions, useStoreState } from "app/state/store/hooks";

interface useCMSDataProps {
  loadData?: boolean;
  returnData?: boolean;
}

export function useCMSData(props: useCMSDataProps) {
  const [currentLanguage] = useRecoilState(languageAtom);
  const [cmsData, setCMSData] = useRecoilState(cmsDataAtom);

  const generalCMSAction = useStoreActions(
    (actions) => actions.cms.general.fetch
  );
  const generalCMSData = useStoreState((state) => state.cms.general.data);
  const priorityAreasCMSAction = useStoreActions(
    (actions) => actions.cms.priorityAreas.fetch
  );
  const priorityAreasCMSData = useStoreState(
    (state) => state.cms.priorityAreas.data
  );
  const vizCMSAction = useStoreActions((actions) => actions.cms.viz.fetch);
  const vizCMSData = useStoreState((state) => state.cms.viz.data);
  const filtersCMSAction = useStoreActions(
    (actions) => actions.cms.filters.fetch
  );
  const filtersCMSData = useStoreState((state) => state.cms.filters.data);
  const menuCMSAction = useStoreActions((actions) => actions.cms.menu.fetch);
  const menuCMSData = useStoreState((state) => state.cms.menu.data);

  const pagesCMSAction = useStoreActions((actions) => actions.cms.pages.fetch);
  const pagesCMSData = useStoreState((state) => state.cms.pages.data);

  const tooltipsCMSAction = useStoreActions(
    (actions) => actions.cms.tooltips.fetch
  );
  const tooltipsCMSData = useStoreState((state) => state.cms.tooltips.data);

  const regionsCMSAction = useStoreActions(
    (actions) => actions.cms.regions.fetch
  );
  const regionsCMSData = useStoreState((state) => state.cms.regions.data);

  function formatCMSData() {
    let newData = {};
    const items = [
      {
        key: "general",
        data: generalCMSData || {},
      },
      {
        key: "viz",
        data: vizCMSData || {},
      },
      {
        key: "filters",
        data: filtersCMSData || {},
      },
      {
        key: "menu",
        data: menuCMSData || {},
      },
      {
        key: "pages",
        data: pagesCMSData || {},
      },
      {
        key: "tooltips",
        data: tooltipsCMSData || {},
      },
      {
        key: "regions",
        data: regionsCMSData || {},
      },
      {
        key: "priorityAreas",
        data: priorityAreasCMSData || {},
      },
    ];
    items.forEach((item) => {
      let filteredData = {};
      Object.keys(item.data).forEach((key: string) => {
        if (currentLanguage === "en" && key.indexOf("_") === -1) {
          filteredData = {
            ...filteredData,
            [key]: get(item.data, `${key}`, ""),
          };
        } else if (key.indexOf(`_${currentLanguage}`) > -1) {
          filteredData = {
            ...filteredData,
            [`${key.replace(`_${currentLanguage}`, "")}`]: get(
              item.data,
              `${key}`,
              ""
            ),
          };
        } else {
          filteredData = {
            ...filteredData,
            [key]: get(item.data, `${key}`, ""),
          };
        }
      });
      newData = {
        ...newData,
        [item.key]: filteredData,
      };
    });
    setCMSData(newData);
  }

  React.useEffect(() => {
    if (props.loadData) {
      generalCMSAction({
        isCMSfetch: true,
      });
      vizCMSAction({
        isCMSfetch: true,
      });
      filtersCMSAction({
        isCMSfetch: true,
      });
      menuCMSAction({
        isCMSfetch: true,
      });
      pagesCMSAction({
        isCMSfetch: true,
      });
      tooltipsCMSAction({
        isCMSfetch: true,
      });
      regionsCMSAction({
        isCMSfetch: true,
      });
      priorityAreasCMSAction({
        isCMSfetch: true,
      });
    }
  }, []);

  useUpdateEffect(() => {
    if (props.loadData) {
      formatCMSData();
    }
  }, [
    currentLanguage,
    generalCMSData,
    vizCMSData,
    filtersCMSData,
    menuCMSData,
    pagesCMSData,
    tooltipsCMSData,
    regionsCMSData,
    priorityAreasCMSData,
  ]);

  if (props.returnData) {
    return cmsData;
  }

  return null;
}
