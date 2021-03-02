import React from "react";
import get from "lodash/get";
import maxBy from "lodash/maxBy";
import { Box, Grid, Hidden } from "@material-ui/core";
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
import { SunburstChartSimplified } from "app/components/Charts/sunburst-simplified";
import { useWindowSize } from "app/hooks/useWindowSize";
import { Collapsable } from "./Collapseable";

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
  unallocablePercentage: number;
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
  const [width, height] = useWindowSize();
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
        >
          {props.vizDataLoading.oda ? (
            <VizLoader />
          ) : (
            <BarChart
              height={260}
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
          label="Thematic Areas"
          link="/viz/thematic-areas"
          childrencontainerStyle={{
            scale: 0.7,
          }}
        >
          {props.vizDataLoading.thematic ? (
            <VizLoader />
          ) : (
            <ThematicAreas
              selectedVizItemId={null}
              setSelectedVizItem={() => null}
              data={props.thematicAreasChartData}
            />
          )}
        </GridWidget>
      </Grid>

      {/* ----------------------------- */}
      {/*  row 2 */}
      {/* ----------------------------- */}
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <GridWidget label="Sectors" link="/viz/sectors" tooltip="lorem ipsum">
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
        <GridWidget
          label="Regions"
          tooltip="lorem ipsum"
          link="/viz/countries-regions"
          childrencontainerStyle={{
            width: 100,
            height: 100,
            paddingTop: 20,
          }}
        >
          {props.vizDataLoading.locations ? (
            <VizLoader />
          ) : (
            <Treemap
              label=""
              height={230}
              selectedVizItemId={null}
              setSelectedVizItem={() => null}
              data={props.locationsTreemapData}
            />
          )}
        </GridWidget>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <GridWidget
          label="Organisations"
          tooltip="lorem ipsum"
          link="/viz/organisations"
          childrencontainerStyle={{
            width: 100,
            height: 100,
            paddingTop: 20,
          }}
        >
          {props.vizDataLoading.organisations ? (
            <VizLoader />
          ) : (
            <Treemap
              label=""
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
          label="Budget Lines"
          tooltip="lorem ipsum"
          link="/viz/budget-lines"
          childrencontainerStyle={{
            width: 100,
            paddingTop: 20,
          }}
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
          label="Result"
          height="510px"
          tooltip="lorem ipsum"
          childrencontainerStyle={{ paddingTop: 33 }}
        >
          See more thoroughly about recent results of development cooperation of
          Finland
        </GridWidget>
      </Grid>

      {/* ----------------------------- */}
      {/*  row 4 */}
      {/* ----------------------------- */}
      <Grid item xs={12} sm={12} md={12} lg={8}>
        <GridWidget
          interactive
          label="SDGs"
          // todo: create responsive solution for height
          height="510px"
          tooltip="lorem ipsum"
          childrencontainerStyle={{ paddingTop: 33 }}
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
          label="About"
          height="510px"
          tooltip="lorem ipsum"
          childrencontainerStyle={{ paddingTop: 33 }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially
        </GridWidget>
      </Grid>

      {/* ----------------------------- */}
      {/*  row 5 */}
      {/* ----------------------------- */}
      <Hidden xsDown>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <GridWidget
            label="Map"
            height="680px"
            interactive
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
                  label="Disbursements Amount"
                  startValue={0}
                  totalValue={get(maxBy(props.geoMapData, "value"), "value", 0)}
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
