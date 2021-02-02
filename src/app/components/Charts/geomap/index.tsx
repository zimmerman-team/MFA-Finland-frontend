// @ts-nocheck

import React from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geojson } from "./features";

import { Tooltip } from "./tooltip";
import get from "lodash/get";
import { css } from "styled-components/macro";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ProjectPalette } from "../../../theme";

// This is the main reason I chose to go with Nivo for this chart,
// Mapbox does not support different projectionTypes and has the Mercator style as default.
// 'naturalEarth1' comes closes to our needs.
const projectionType = [
  "mercator",
  "naturalEarth1",
  "equirectangular",
  "equalEarth",
];

const GeomapContainerStyle = css`
  width: 900px;
  height: 442px;
  margin: auto;
  margin-bottom: 19px;

  @media (max-width: 960px) {
    height: 338px;
  }

  * > path:hover {
    fill: ${ProjectPalette.primary.main};
  }
`;

const colorScheme = [
  "#E5F0F0",
  "#DCECEC",
  "#D0E5E5",
  "#C1DDDD",
  "#ACD1D1",
  "#8DB7B5",
  "#71A29C",
];
const margin = { top: 0, right: 0, bottom: 0, left: 0 };

// Please refer to https://nivo.rocks/choropleth and https://nivo.rocks/geo to see all available options.
export function Geomap({ geoData }) {
  const [tooltip, setTooltip] = React.useState("");
  const [isLocked, setIsLocked] = React.useState(false);
  const mobile = useMediaQuery("(max-width:960px)");

  return (
    <div css={GeomapContainerStyle}>
      <ResponsiveChoropleth
        data={geoData}
        features={geojson.features} // Providing a country only view is possible by changing the features, see this:
        margin={margin}
        colors={colorScheme}
        domain={[0, 1000000]} // Scale of values.
        unknownColor="#E3E3E3" // This color is used when there is no available data for that country code.
        label="properties.name"
        projectionType={mobile ? projectionType[0] : projectionType[1]}
        projectionScale={188}
        projectionTranslation={[0.45, 0.59]}
        borderWidth={1}
        borderColor="#fff"
        layers={["features"]}
        onClick={() => setIsLocked(!isLocked)}
        isInteractive
        tooltip={(hoveredCountry) => {
          if (hoveredCountry.feature.label !== tooltip.label && !isLocked) {
            setTooltip(() => hoveredCountry.feature);
          }
          return null;
        }}
      />
      {tooltip.label && (
        <Tooltip
          label={tooltip.label}
          value={tooltip.value}
          type={get(geoData, "label", "activities")}
          isLocked={isLocked}
          handleLockClick={() => !isLocked}
        />
      )}
    </div>
  );
}
