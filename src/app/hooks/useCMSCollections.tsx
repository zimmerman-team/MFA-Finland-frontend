import React from "react";
import get from "lodash/get";
import { useRecoilState } from "recoil";
import { useUpdateEffect } from "react-use";
import { cmsCollectionsAtom, languageAtom } from "app/state/recoil/atoms";
import { useStoreActions, useStoreState } from "app/state/store/hooks";

interface useCMSDataProps {
  loadData?: boolean;
  returnData?: boolean;
}

export function useCMSCollections(props: useCMSDataProps) {
  const [currentLanguage] = useRecoilState(languageAtom);
  const [cmsData, setCMSData] = useRecoilState(cmsCollectionsAtom);

  // Collections state
  const aboutPageCMSData = useStoreState(
    (state) => state.cms.collections.aboutPage.data
  );
  const feedbackPageCMSData = useStoreState(
    (state) => state.cms.collections.feedbackPage.data
  );
  const resultsPageCMSData = useStoreState(
    (state) => state.cms.collections.resultsPage.data
  );
  const statementsPageCMSData = useStoreState(
    (state) => state.cms.collections.statementsPage.data
  );

  // Collections actions
  const aboutPageCMSAction = useStoreActions(
    (actions) => actions.cms.collections.aboutPage.fetch
  );
  const feedbackPageCMSAction = useStoreActions(
    (actions) => actions.cms.collections.feedbackPage.fetch
  );
  const resultsPageCMSAction = useStoreActions(
    (actions) => actions.cms.collections.resultsPage.fetch
  );
  const statementsPageCMSAction = useStoreActions(
    (actions) => actions.cms.collections.statementsPage.fetch
  );

  function formatCMSData() {
    const items = [
      {
        key: "about",
        data: aboutPageCMSData || {},
      },
      {
        key: "feedback",
        data: feedbackPageCMSData || {},
      },
      {
        key: "results",
        data: resultsPageCMSData || {},
      },
      {
        key: "statements",
        data: statementsPageCMSData || {},
      },
    ];

    const formattedData: any = {
      about: [],
      feedback: [],
      results: [],
      statements: [],
    };
    items.forEach((item) => {
      // @ts-ignore
      item.data.entries?.forEach((entry: any) => {
        switch (currentLanguage) {
          case "en":
            formattedData[item.key].push({
              title: entry.title,
              content: entry.content,
              faqItems: entry.faq_items,
            });
            break;
          case "fi":
            formattedData[item.key].push({
              title: entry.title_fi,
              content: entry.content_fi,
              faqItems: entry.faq_items_fi,
            });
            break;
          case "se":
            formattedData[item.key].push({
              title: entry.title_se,
              content: entry.content_se,
              faqItems: entry.faq_items_se,
            });
            break;
          default:
            formattedData[item.key].push({
              title: entry.title,
              content: entry.content,
              faqItems: entry.faq_items,
            });
            break;
        }
      });
    });
    setCMSData(formattedData);
  }

  React.useEffect(() => {
    if (props.loadData) {
      aboutPageCMSAction({
        isCMSfetch: true,
      });
      feedbackPageCMSAction({
        isCMSfetch: true,
      });
      resultsPageCMSAction({
        isCMSfetch: true,
      });
      statementsPageCMSAction({
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
    aboutPageCMSData,
    resultsPageCMSData,
    feedbackPageCMSData,
    statementsPageCMSData,
  ]);

  if (props.returnData) {
    return cmsData;
  }

  return null;
}
