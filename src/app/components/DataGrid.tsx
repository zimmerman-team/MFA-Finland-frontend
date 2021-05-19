import React from "react";
import get from "lodash/get";
import maxBy from "lodash/maxBy";
import { useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import { Grid, Hidden, Typography } from "@material-ui/core";
import { useCMSData } from "app/hooks/useCMSData";
import { SDGviz } from "app/components/Charts/sdg";
import { BarChart } from "app/components/Charts/bar";
import { Geomap } from "app/components/Charts/geomap";
import { GridWidget } from "app/components/GridWidget";
import { Treemap } from "app/components/Charts/treemap";
import { selectedFilterAtom } from "app/state/recoil/atoms";

import { ThematicAreas } from "app/components/Charts/thematicareas";
import { Legend } from "app/components/Charts/geomap/common/Legend";
import { DataProps } from "app/components/Charts/thematicareas/data";
import { BudgetLinesBarChart } from "app/components/Charts/bar/variations/budgetlines";
import { TreemapDataModel } from "app/components/Charts/treemap/data";
import { SDGvizItemProps } from "app/components/Charts/sdg/data";
import { VizLoader } from "app/modules/common/viz-loader";
import { Collapsable } from "app/components/Collapseable";
import { SunburstChartSimplified } from "app/components/Charts/sunburst-simplified";
import { useWindowSize } from "app/hooks/useWindowSize";
import { ContactInformation } from "app/modules/detail-modules/country-detail-module/ContactInformation";
import { RssFeed } from "app/modules/detail-modules/country-detail-module/RssFeed";

export interface DataGridProps {
  odaBarChartData: any;
  thematicAreasChartData: DataProps[];
  sectorsSunburstDataCount: number;
  sectorsSunburstData: any;
  locationsTreemapData: TreemapDataModel;
  organisationsTreemapData: TreemapDataModel;
  budgetLinesBarChartData: any;
  sdgVizData: SDGvizItemProps[];
  geoMapData: any;
  countryData?: any;
  unallocablePercentage: number;
  sectorDescription?: string;
  detailPageFilter?: {
    key: string;
    value: string | string[];
  };
  vizDataLoading: {
    oda: boolean;
    thematic: boolean;
    sectors: boolean;
    locations: boolean;
    organisations: boolean;
    budgetLines: boolean;
    sdg: boolean;
    geo: boolean;
  };
}

export const DataGrid = (props: DataGridProps) => {
  const location = useLocation();
  const [width] = useWindowSize();
  const cmsData = useCMSData({ returnData: true });
  const [selectedFilters] = useRecoilState(selectedFilterAtom);

  const isOrgTypeDetail = location.pathname.indexOf("organisation-types") > -1;
  const isOrgDetail = location.pathname.indexOf("organisations") > -1;
  const isSectorDetail = location.pathname.indexOf("sectors") > -1;
  const isCountryDetail = location.pathname.indexOf("countries") > -1;
  const isRegionDetail = location.pathname.indexOf("regions") > -1;
  const isAreaDetail = location.pathname.indexOf("thematic-area") > -1;
  let showSingleAreaCircle = isAreaDetail;
  if (selectedFilters.tag.length > 0) {
    if (selectedFilters.tag.length === 1) {
      showSingleAreaCircle = true;
    } else if (selectedFilters.tag.length === 2) {
      const splits = [
        selectedFilters.tag[0].split("|"),
        selectedFilters.tag[1].split("|"),
      ];
      showSingleAreaCircle = splits[0][0] === splits[1][0];
    }
  }

  function getResultBlockContent() {
    if (isOrgTypeDetail || isOrgDetail) {
      return {
        label: "",
        text: "",
      };
    }
    if (isAreaDetail) {
      return {
        label: get(
          cmsData,
          "general.thematicareas_detail_title",
          "Thematic area info"
        ),
        text: getThematicAreaResultBlock(),
      };
    }
    if (isSectorDetail) {
      return {
        label: "Sector info",
        text: props.sectorDescription,
      };
    }
    if (isCountryDetail) {
      return {
        label: "Contact Department in MFA",
        text: "",
      };
    }
    if (isRegionDetail) {
      return {
        label: "Finland and the region in development cooperation?",
        text: getRegionContent(),
      };
    }
    return {
      label: get(cmsData, "general.result", "Result"),
      text: get(
        cmsData,
        "pages.homepageresult",
        "Positive results build societies and contribute to global stability and wellbeing. They advance Finland’s foreign policy goals and meeting global commitments. With development cooperation Finland contributes to solving of the major problems that are facing humankind."
      ),
    };
  }

  function getThematicAreaResultBlock(): string {
    const area = props.detailPageFilter;

    if (area) {
      if (area.value[0] === "Priority area 1| primary") {
        return get(
          cmsData,
          "general.thematicareas_detail_strengthening_of_rights",
          ""
        );
      }
      if (area.value[0] === "Priority area 2| primary") {
        return get(cmsData, "general.thematicareas_detail_generating_jobs", "");
      }
      if (area.value[0] === "Priority area 3| primary") {
        return get(
          cmsData,
          "general.thematicareas_detail_improving_democracy  ",
          ""
        );
      }
      if (area.value[0] === "Priority area 4| primary") {
        return get(
          cmsData,
          "general.thematicareas_detail_improving_food_security",
          ""
        );
      }
    }

    return "";
  }
  function getRegionContent(): string {
    const region = props.detailPageFilter;

    if (region) {
      if (region.value === "89") {
        return get(cmsData, "regions.europe", "");
      }
      if (region.value === "189") {
        return get(cmsData, "regions.northofsahara", "");
      }
      if (region.value === "289") {
        return get(cmsData, "regions.southofsahara", "");
      }
      if (region.value === "398") {
        return get(cmsData, "regions.northandcentralamerica", "");
      }
      if (region.value === "498") {
        return get(cmsData, "regions.america", "");
      }
      if (region.value === "489") {
        return get(cmsData, "regions.southamerika", "");
      }
      if (region.value === "589") {
        return get(cmsData, "regions.middleeast", "");
      }
      if (region.value === "619") {
        return get(cmsData, "regions.centralasia", "");
      }
      if (region.value === "679") {
        return get(cmsData, "regions.southasia", "");
      }
      if (region.value === "689") {
        return get(cmsData, "regions.southandcentralasia", "");
      }
      if (region.value === "798") {
        return get(cmsData, "regions.asia", "");
      }
      if (region.value === "789") {
        return get(cmsData, "regions.fareastasia", "");
      }
      if (region.value === "998") {
        return get(cmsData, "regions.unspecified", "");
      }
    }
    return "";
  }

  function getAboutBlockContent() {
    if (isOrgTypeDetail || isOrgDetail || isSectorDetail || isRegionDetail) {
      return {
        label: "",
        text: "",
      };
    }
    if (isCountryDetail) {
      return {
        label: "RSS Feed",
        text: "",
      };
    }

    return {
      label: "About",
      text: get(
        cmsData,
        "pages.homepageabout",
        "Openaid.fi is databank on Finland’s development cooperation. The site presents where, to whom, and when Finland has contributed the official development assistance through development cooperation and what kind of results has been accomplished. The objective of Openaid.fi is to enhance the openness of development cooperation by providing a single service for providing the information on development cooperation of Finland."
      ),
    };
  }

  const resultContent = getResultBlockContent();
  const aboutContent = getAboutBlockContent();

  return (
    <React.Fragment>
      <div
        css={`
          height: 16px;
          width: 100%;
        `}
      />
      {/* ----------------------------- */}
      {/*  row 1 */}
      {/* ----------------------------- */}
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={8}
        xl={8}
        // css={`
        //   margin-top: 16px;
        // `}
      >
        <GridWidget
          link="/viz/oda"
          tooltip={get(cmsData, "tooltips.overview_disbursements", "")}
          label="Overview Disbursements"
          detailPageFilter={props.detailPageFilter}
        >
          {props.vizDataLoading.oda || props.odaBarChartData.length === 0 ? (
            <VizLoader loading={props.vizDataLoading.oda} />
          ) : (
            <BarChart
              aria-label="Bar chart displaying the disbursed amount of euro's per year"
              height={250}
              vizCompData={[]}
              data={props.odaBarChartData}
              onZoomOut={() => null}
              selectedVizItemId={null}
              setVizCompData={() => null}
              onSelectChange={() => null}
              setSelectedVizItem={() => null}
              hideODAGNI={
                isOrgTypeDetail ||
                isOrgDetail ||
                isSectorDetail ||
                isCountryDetail ||
                isRegionDetail ||
                isAreaDetail
              }
            />
          )}
        </GridWidget>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4}>
        <GridWidget
          tooltip={get(cmsData, "tooltips.thematic_areas", "")}
          link="/viz/thematic-areas"
          detailPageFilter={props.detailPageFilter}
          label={get(cmsData, "general.thematicareas", "Thematic areas")}
        >
          {props.vizDataLoading.thematic ? (
            <VizLoader loading={props.vizDataLoading.thematic} />
          ) : (
            <>
              {!showSingleAreaCircle && <div css="width: 100%;height: 70px;" />}
              <ThematicAreas
                showOnlyViz
                linkedLabels
                selectedVizItemId={null}
                setSelectedVizItem={() => null}
                data={props.thematicAreasChartData}
                showSingleCircle={showSingleAreaCircle}
                aria-label="Visualisation displaying which thematic area has been worked on the most/has the most money funded to."
              />
            </>
          )}
        </GridWidget>
      </Grid>

      {/* ----------------------------- */}
      {/*  row 2 */}
      {/* ----------------------------- */}
      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
        <GridWidget
          link="/viz/sectors"
          tooltip={get(cmsData, "tooltips.sectors", "")}
          detailPageFilter={props.detailPageFilter}
          label={get(cmsData, "general.sectors", "Sectors")}
          childrencontainerStyle={{
            width: 100,
            height: 100,
            placeContent: "center",
          }}
        >
          {props.vizDataLoading.sectors ||
          props.sectorsSunburstData.children.length === 0 ? (
            <VizLoader loading={props.vizDataLoading.sectors} />
          ) : (
            <SunburstChartSimplified
              aria-label="Visualisation displaying which thematic area has been worked on the most/has the most money funded to."
              sectorDrillDown=""
              onZoomOut={() => null}
              selectedVizItemId={null}
              setSelectedVizItem={() => null}
              data={props.sectorsSunburstData}
              onSectorSelectChange={() => null}
              activitiesCount={props.sectorsSunburstDataCount}
            />
          )}
        </GridWidget>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
        {!props.countryData ? (
          <GridWidget
            tooltip={get(cmsData, "tooltips.regions", "")}
            link="/viz/countries-regions"
            label={get(cmsData, "general.locations", "Regions")}
            childrencontainerStyle={{
              width: 100,
              height: 100,
              paddingTop: 20,
            }}
            detailPageFilter={props.detailPageFilter}
          >
            {props.vizDataLoading.locations ||
            props.locationsTreemapData.children.length === 0 ? (
              <VizLoader loading={props.vizDataLoading.locations} />
            ) : (
              <Treemap
                height={230}
                showSmTooltip
                label="locations"
                selectedVizItemId={null}
                setSelectedVizItem={() => null}
                data={props.locationsTreemapData}
                aria-label="Treemap visualisation displaying which region has the most euro's disbursed to."
              />
            )}
          </GridWidget>
        ) : (
          <GridWidget
            interactive
            height="510px"
            label={resultContent.label}
            tooltip={
              isCountryDetail
                ? get(cmsData, "tooltips.contact_department", "")
                : get(cmsData, "tooltips.result", "")
            }
            childrencontainerStyle={{ paddingTop: 33 }}
          >
            {isCountryDetail ? <ContactInformation /> : resultContent.text}
          </GridWidget>
        )}
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
        <GridWidget
          tooltip={get(cmsData, "tooltips.organisations", "")}
          link="/viz/organisations"
          label={get(cmsData, "general.organisations", "Organisations")}
          childrencontainerStyle={{
            width: 100,
            height: 100,
            paddingTop: 20,
          }}
          detailPageFilter={props.detailPageFilter}
        >
          {props.vizDataLoading.organisations ||
          props.organisationsTreemapData.children.length === 0 ? (
            <VizLoader loading={props.vizDataLoading.organisations} />
          ) : (
            <Treemap
              height={230}
              showSmTooltip
              label="organisations"
              selectedVizItemId={null}
              setSelectedVizItem={() => null}
              data={props.organisationsTreemapData}
              aria-label="Treemap visualisation displaying which organisation type has the most euro's disbursed."
            />
          )}
        </GridWidget>
      </Grid>

      {/* ----------------------------- */}
      {/*  row 3 */}
      {/* ----------------------------- */}
      <Grid item xs={12} sm={12} md={12} lg={8}>
        <GridWidget
          height="510px"
          tooltip={get(cmsData, "tooltips.budget_lines", "")}
          link="/viz/budget-lines"
          label={get(cmsData, "general.budgetlines", "Budget lines")}
          childrencontainerStyle={{
            width: 100,
            paddingTop: 20,
          }}
          detailPageFilter={props.detailPageFilter}
        >
          {props.vizDataLoading.budgetLines ||
          props.budgetLinesBarChartData.length === 0 ? (
            <VizLoader loading={props.vizDataLoading.budgetLines} />
          ) : (
            <BudgetLinesBarChart
              height={450}
              vizCompData={[]}
              onZoomOut={() => null}
              selectedVizItemId={null}
              setVizCompData={() => null}
              onSelectChange={() => null}
              setSelectedVizItem={() => null}
              data={props.budgetLinesBarChartData}
            />
          )}
        </GridWidget>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={4}
        xl={4}
        css={`
          @media (max-width: 960px) {
            order: 1;
          }
          @media (max-width: 1440px) {
            order: 1;
          }
        `}
      >
        <GridWidget
          interactive
          height="510px"
          label={
            isCountryDetail ? "Human Development Index" : resultContent.label
          }
          tooltip={
            isCountryDetail
              ? get(cmsData, "tooltips.human_development_index", "")
              : get(cmsData, "tooltips.result", "")
          }
          childrencontainerStyle={{ paddingTop: 33 }}
        >
          {isCountryDetail
            ? props.countryData.countryIndicators.map((indicator: string) => {
                const values = indicator.split(":");
                if (values.length === 2) {
                  return (
                    <div
                      key={indicator}
                      css={`
                        margin: 8px 0;
                        font-size: 14px;
                      `}
                    >
                      {values[0]}:{" "}
                      <span css="font-size: 16px;font-weight: bold;">
                        {values[1]}
                      </span>
                    </div>
                  );
                }
                return "";
              })
            : resultContent.text}
        </GridWidget>
      </Grid>

      {/* ----------------------------- */}
      {/*  row 4 */}
      {/* ----------------------------- */}
      <Grid item xs={12} sm={12} md={12} lg={8}>
        <GridWidget
          interactive
          // todo: create responsive solution for height
          // height="510px"
          tooltip={get(cmsData, "tooltips.sdg", "")}
          childrencontainerStyle={{ paddingTop: 33 }}
          label={get(cmsData, "general.sdgs", "SDGs")}
        >
          {props.vizDataLoading.sdg ? (
            <VizLoader loading={props.vizDataLoading.sdg} />
          ) : (
            <SDGviz data={props.sdgVizData} />
          )}
        </GridWidget>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={4}
        xl={4}
        css={`
          @media (max-width: 960px) {
            order: 1;
          }
          @media (max-width: 1440px) {
            order: 1;
          }
        `}
      >
        <GridWidget
          interactive
          height="510px"
          tooltip={
            isCountryDetail
              ? get(cmsData, "tooltips.rssfeed", "")
              : get(cmsData, "tooltips.about", "")
          }
          childrencontainerStyle={
            isCountryDetail
              ? { paddingTop: 33, overflow: "auto" }
              : { paddingTop: 33 }
          }
          label={
            isCountryDetail
              ? "RSS Feed"
              : get(cmsData, "general.about", "About")
          }
        >
          {isCountryDetail ? <RssFeed /> : aboutContent.text}
        </GridWidget>
      </Grid>

      {/* ----------------------------- */}
      {/*  row 5 */}
      {/* ----------------------------- */}
      <Hidden xsDown>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          css={`
            @media (max-width: 960px) {
              order: 2;
            }
            @media (max-width: 1440px) {
              order: 2;
            }
          `}
        >
          <GridWidget
            height="680px"
            interactive
            tooltip={get(cmsData, "tooltips.map", "")}
            label={get(cmsData, "general.map", "Map")}
            childrencontainerStyle={{ paddingTop: width >= 960 ? 88 : 16 }}
          >
            {props.vizDataLoading.geo ? (
              <VizLoader loading={props.vizDataLoading.geo} />
            ) : (
              <div
                css={`
                  position: relative;
                `}
              >
                <Collapsable unallocable={props.unallocablePercentage} />
                <Geomap geoData={props.geoMapData} />
                <Legend
                  startValue={0}
                  totalValue={get(maxBy(props.geoMapData, "value"), "value", 0)}
                  label={get(
                    cmsData,
                    "viz.disbursementsamount",
                    "Disbursements amount"
                  )}
                />
              </div>
            )}
          </GridWidget>
        </Grid>
      </Hidden>
    </React.Fragment>
  );
};
