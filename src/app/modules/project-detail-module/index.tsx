import React from "react";
import get from "lodash/get";
import filter from "lodash/filter";
import { useRecoilState } from "recoil";
import { getAppName } from "app/const/Path";
import useTitle from "react-use/lib/useTitle";
import { useRouteMatch } from "react-router-dom";
import { languageAtom } from "app/state/recoil/atoms";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { initActivityDetailData } from "app/components/ActivityAccordion/model";
import { ProjectDetailModuleLayout } from "app/modules/project-detail-module/layout";
import { PageLoader } from "../common/page-loader";

const moduleName = "Project Detail";

export function ProjectDetailModule() {
  const [currentLanguage] = useRecoilState(languageAtom);
  useTitle(`${moduleName} | ${getAppName(currentLanguage)}`);
  const { params } = useRouteMatch();
  const activityId = get(params, "param", "");

  const activityDetailData = useStoreState((state) => {
    if (get(state.activityDetail, "data.data.metadata", null)) {
      return get(state.activityDetail, "data.data", initActivityDetailData);
    }
    return initActivityDetailData;
  });
  const activityDetailAction = useStoreActions(
    (actions) => actions.activityDetail.fetch
  );
  const activityDetailClearAction = useStoreActions(
    (actions) => actions.activityDetail.clear
  );
  const sdgVizAction = useStoreActions((actions) => actions.activitySDG.fetch);
  const sdgVizData = useStoreState((state) =>
    get(state.activitySDG, "data.vizData", [])
  );
  const loading = useStoreState(
    (state) => state.activityDetail.loading || state.activitySDG.loading
  );

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    activityDetailAction({
      values: {
        activityId: decodeURIComponent(activityId),
        lang: currentLanguage,
      },
    });
    sdgVizAction({
      values: {
        filters: {
          iati_identifier: [decodeURIComponent(activityId)],
        },
      },
    });
    return () => activityDetailClearAction();
  }, [activityId, currentLanguage]);

  return (
    <React.Fragment>
      {loading && <PageLoader />}
      <ProjectDetailModuleLayout
        {...activityDetailData}
        sdgVizData={filter(sdgVizData, { disabled: false })}
      />
      <div
        css={`
          position: fixed;
          top: 0;
          right: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          z-index: -1;
          background-color: white;
        `}
      />
    </React.Fragment>
  );
}
