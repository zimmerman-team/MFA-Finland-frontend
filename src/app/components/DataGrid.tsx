import React from "react";
import get from "lodash/get";
import maxBy from "lodash/maxBy";
import { useLocation } from "react-router-dom";
import { Grid, Hidden } from "@material-ui/core";
import { useCMSData } from "app/hooks/useCMSData";
import { SDGviz } from "app/components/Charts/sdg";
import { BarChart } from "app/components/Charts/bar";
import { Geomap } from "app/components/Charts/geomap";
import { GridWidget } from "app/components/GridWidget";
import { Treemap } from "app/components/Charts/treemap";

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

// todo: check if we actually need the "childrencontainerStyle" property

export const DataGrid = (props: DataGridProps) => {
  const location = useLocation();
  const [width] = useWindowSize();
  const cmsData = useCMSData({ returnData: true });

  const isOrgTypeDetail = location.pathname.indexOf("organisation-types") > -1;
  const isOrgDetail = location.pathname.indexOf("organisations") > -1;
  const isSectorDetail = location.pathname.indexOf("sectors") > -1;
  const isCountryDetail = location.pathname.indexOf("countries") > -1;
  const isRegionDetail = location.pathname.indexOf("regions") > -1;
  const isAreaDetail = location.pathname.indexOf("thematic-area") > -1;

  function getResultBlockContent() {
    if (isOrgTypeDetail || isOrgDetail) {
      return {
        label: "",
        text: "",
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
        text: "",
      };
    }
    return {
      label: "Result",
      text:
        "See more thoroughly about recent results of development cooperation of Finland",
    };
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
      text:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
    };
  }

  const resultContent = getResultBlockContent();
  const aboutContent = getAboutBlockContent();

  return (
    <React.Fragment>
      {/* ----------------------------- */}
      {/*  row 1 */}
      {/* ----------------------------- */}
      <Grid item xs={12} sm={12} md={12} lg={8}>
        <GridWidget
          link="/viz/oda"
          tooltip="lorem ipsum"
          label="Overview Disbursements"
          detailPageFilter={props.detailPageFilter}
        >
          {props.vizDataLoading.oda ? (
            <VizLoader />
          ) : (
            <BarChart
              height={250}
              vizCompData={[]}
              data={props.odaBarChartData}
              onZoomOut={() => null}
              selectedVizItemId={null}
              setVizCompData={() => null}
              onSelectChange={() => null}
              setSelectedVizItem={() => null}
            />
          )}
        </GridWidget>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <GridWidget
          tooltip="lorem ipsum"
          link="/viz/thematic-areas"
          detailPageFilter={props.detailPageFilter}
          label={get(cmsData, "general.thematicareas", "Thematic areas")}
        >
          {props.vizDataLoading.thematic ? (
            <VizLoader />
          ) : (
            <>
              {!isAreaDetail && <div css="width: 100%;height: 70px;" />}
              <ThematicAreas
                showOnlyViz
                selectedVizItemId={null}
                showSingleCircle={isAreaDetail}
                setSelectedVizItem={() => null}
                data={props.thematicAreasChartData}
              />
            </>
          )}
        </GridWidget>
      </Grid>

      {/* ----------------------------- */}
      {/*  row 2 */}
      {/* ----------------------------- */}
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <GridWidget
          link="/viz/sectors"
          tooltip="lorem ipsum"
          detailPageFilter={props.detailPageFilter}
          label={get(cmsData, "general.sectors", "Sectors")}
        >
          {props.vizDataLoading.sectors ? (
            <VizLoader />
          ) : (
            <div>
              <SunburstChartSimplified
                sectorDrillDown=""
                onZoomOut={() => null}
                selectedVizItemId={null}
                setSelectedVizItem={() => null}
                data={props.sectorsSunburstData}
                onSectorSelectChange={() => null}
                activitiesCount={props.sectorsSunburstDataCount}
              />
            </div>
          )}
        </GridWidget>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        {!props.countryData ? (
          <GridWidget
            tooltip="lorem ipsum"
            link="/viz/countries-regions"
            label={get(cmsData, "general.locations", "Regions")}
            childrencontainerStyle={{
              width: 100,
              height: 100,
              paddingTop: 20,
            }}
            detailPageFilter={props.detailPageFilter}
          >
            {props.vizDataLoading.locations ? (
              <VizLoader />
            ) : (
              <Treemap
                label="locations"
                height={230}
                selectedVizItemId={null}
                setSelectedVizItem={() => null}
                data={props.locationsTreemapData}
              />
            )}
          </GridWidget>
        ) : (
          <GridWidget
            interactive
            label="Human Development Index"
            tooltip="Human Development Index"
            childrencontainerStyle={{
              width: 100,
              height: 100,
              paddingTop: 20,
            }}
          >
            {props.countryData.countryIndicators.map((indicator: string) => {
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
            })}
          </GridWidget>
        )}
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <GridWidget
          tooltip="lorem ipsum"
          link="/viz/organisations"
          label={get(cmsData, "general.organisations", "Organisations")}
          childrencontainerStyle={{
            width: 100,
            height: 100,
            paddingTop: 20,
          }}
          detailPageFilter={props.detailPageFilter}
        >
          {props.vizDataLoading.organisations ? (
            <VizLoader />
          ) : (
            <Treemap
              label="organisations"
              height={230}
              selectedVizItemId={null}
              setSelectedVizItem={() => null}
              data={props.organisationsTreemapData}
            />
          )}
        </GridWidget>
      </Grid>

      {/* ----------------------------- */}
      {/*  row 3 */}
      {/* ----------------------------- */}
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <GridWidget
          height="510px"
          tooltip="lorem ipsum"
          link="/viz/budget-lines"
          label={get(cmsData, "general.budgetlines", "Budget lines")}
          childrencontainerStyle={{
            width: 100,
            paddingTop: 20,
          }}
          detailPageFilter={props.detailPageFilter}
        >
          {props.vizDataLoading.budgetLines ? (
            <VizLoader />
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
        md={4}
        lg={4}
        css={`
          @media (max-width: 960px) {
            order: 1;
          }
        `}
      >
        <GridWidget
          interactive
          height="510px"
          label={resultContent.label}
          tooltip={resultContent.label}
          childrencontainerStyle={{ paddingTop: 33 }}
        >
          {resultContent.text}
        </GridWidget>
      </Grid>

      {/* ----------------------------- */}
      {/*  row 4 */}
      {/* ----------------------------- */}
      <Grid item xs={12} sm={12} md={12} lg={8}>
        <GridWidget
          interactive
          // todo: create responsive solution for height
          height="510px"
          tooltip="lorem ipsum"
          childrencontainerStyle={{ paddingTop: 33 }}
          label={get(cmsData, "general.sdgs", "SDGs")}
        >
          {props.vizDataLoading.sdg ? (
            <VizLoader />
          ) : (
            <SDGviz data={props.sdgVizData} />
          )}
        </GridWidget>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={4}
        css={`
          @media (max-width: 960px) {
            order: 1;
          }
        `}
      >
        <GridWidget
          interactive
          height="510px"
          tooltip={aboutContent.label}
          childrencontainerStyle={{ paddingTop: 33 }}
          label={get(cmsData, "general.about", "About")}
        >
          {aboutContent.text}
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
          css={`
            @media (max-width: 960px) {
              order: 2;
            }
          `}
        >
          <GridWidget
            height="680px"
            interactive
            label={get(cmsData, "general.map", "Map")}
            childrencontainerStyle={{ paddingTop: width >= 960 ? 88 : 16 }}
          >
            {props.vizDataLoading.geo ? (
              <VizLoader />
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

      <Hidden smDown>
        <div css="width: 100%; height: 100px;" />
      </Hidden>
    </React.Fragment>
  );
};
