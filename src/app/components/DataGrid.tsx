import React from "react";
import { Grid, Hidden } from "@material-ui/core";
import { SDGviz } from "app/components/Charts/sdg";
import { BarChart } from "app/components//Charts/bar";
import { Geomap } from "app/components/Charts/geomap";
import { GridWidget } from "app/components/GridWidget";
import { Treemap } from "app/components/Charts/treemap";
import { data } from "app/components/Charts/geomap/data";
import { SunburstChart } from "app/components/Charts/sunburst";
import { ThematicAreas } from "app/components/Charts/thematicareas";
import { Legend } from "app/components/Charts/geomap/common/Legend";
import { SunburstChartMockData } from "app/components/Charts/sunburst/data";
import { thematicareasMockData } from "app/components/Charts/thematicareas/data";
import { BudgetLinesBarChart } from "app/components/Charts/bar/variations/budgetlines";
import {
  barMockData,
  budgetLinesMockData,
} from "app/components/Charts/bar/data";
import {
  CountriesTreemapMockData,
  TreemapMockData,
} from "app/components/Charts/treemap/data";
import { mockData } from "app/components/Charts/sdg/data";

// interface DataGridProps {
//   data?: any;
// }

export const DataGrid = () => {
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
          <BarChart
            height={260}
            vizCompData={[]}
            data={barMockData}
            onZoomOut={() => null}
            selectedVizItemId={null}
            setVizCompData={() => null}
            onSelectChange={() => null}
            setSelectedVizItem={() => null}
          />
        </GridWidget>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <GridWidget
          tooltip="lorem ipsum"
          label="Thematic Areas"
          link="/viz/thematic-areas"
          childrencontainerStyle={{
            marginTop: -70,
            transform: "scale(0.7)",
          }}
        >
          <ThematicAreas
            selectedVizItemId={null}
            data={thematicareasMockData}
            setSelectedVizItem={() => null}
          />
        </GridWidget>
      </Grid>

      {/* ----------------------------- */}
      {/*  row 2 */}
      {/* ----------------------------- */}
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <GridWidget
          label="Sectors"
          link="/viz/sectors"
          tooltip="lorem ipsum"
          childrencontainerStyle={{
            marginTop: -200,
            transform: "scale(0.4)",
          }}
        >
          <SunburstChart
            sectorDrillDown=""
            onZoomOut={() => null}
            selectedVizItemId={null}
            data={SunburstChartMockData}
            setSelectedVizItem={() => null}
            onSectorSelectChange={() => null}
            activitiesCount={8256876601.879997}
          />
        </GridWidget>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <GridWidget
          label="Regions"
          tooltip="lorem ipsum"
          link="/viz/countries-regions"
          childrencontainerStyle={{
            width: "100%",
            height: "100%",
            paddingTop: 20,
          }}
        >
          <Treemap
            label=""
            height={230}
            selectedVizItemId={null}
            setSelectedVizItem={() => null}
            data={CountriesTreemapMockData}
          />
        </GridWidget>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <GridWidget
          label="Organisations"
          tooltip="lorem ipsum"
          link="/viz/organisations"
          childrencontainerStyle={{
            width: "100%",
            height: "100%",
            paddingTop: 20,
          }}
        >
          <Treemap
            label=""
            height={230}
            data={TreemapMockData}
            selectedVizItemId={null}
            setSelectedVizItem={() => null}
          />
        </GridWidget>
      </Grid>

      {/* ----------------------------- */}
      {/*  row 3 */}
      {/* ----------------------------- */}
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <GridWidget
          label="Budget Lines"
          tooltip="lorem ipsum"
          link="/viz/budget-lines"
          childrencontainerStyle={{
            width: "100%",
            paddingTop: 20,
          }}
        >
          <BudgetLinesBarChart
            height={260}
            vizCompData={[]}
            onZoomOut={() => null}
            selectedVizItemId={null}
            data={budgetLinesMockData}
            setVizCompData={() => null}
            onSelectChange={() => null}
            setSelectedVizItem={() => null}
          />
        </GridWidget>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <GridWidget
          interactive
          label="Result"
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
          height="510px"
          tooltip="lorem ipsum"
          childrencontainerStyle={{ paddingTop: 33 }}
        >
          <SDGviz data={mockData} />
        </GridWidget>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
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
      <Hidden smDown>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <GridWidget label="Map" height="680px" interactive>
            <Geomap geoData={data} />
            <Legend label="Budget Amount" startValue={0} totalValue={1000} />
          </GridWidget>
        </Grid>
      </Hidden>
    </React.Fragment>
  );
};
