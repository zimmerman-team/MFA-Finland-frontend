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
  const [cmsData, setCMSData] = useRecoilState(cmsDataAtom);
  const [currentLanguage, setLanguage] = useRecoilState(languageAtom);

  const generalCMSAction = useStoreActions(
    (actions) => actions.cms.general.fetch
  );
  const generalCMSData = useStoreState((state) => state.cms.general.data);
  const vizCMSAction = useStoreActions((actions) => actions.cms.viz.fetch);
  const vizCMSData = useStoreState((state) => state.cms.viz.data);
  const filtersCMSAction = useStoreActions(
    (actions) => actions.cms.filters.fetch
  );
  const filtersCMSData = useStoreState((state) => state.cms.filters.data);
  const menuCMSAction = useStoreActions((actions) => actions.cms.menu.fetch);
  const menuCMSData = useStoreState((state) => state.cms.menu.data);

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
    }
  }, []);

  useUpdateEffect(() => {
    if (props.loadData) {
      formatCMSData();
    }
  }, [generalCMSData, currentLanguage]);

  if (props.returnData) {
    return cmsData;
  }
  return null;
}
