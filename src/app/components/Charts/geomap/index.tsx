// @ts-nocheck
import React from "react";
import get from "lodash/get";
import maxBy from "lodash/maxBy";
import { useRecoilState } from "recoil";
import { ProjectPalette } from "app/theme";
import { css } from "styled-components/macro";
import { ResponsiveChoropleth } from "@nivo/geo";
import { getName } from "app/components/Charts/sdg";
import { languageAtom } from "app/state/recoil/atoms";
import { useWindowSize } from "app/hooks/useWindowSize";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { getCountryISO2 } from "app/utils/countryISOMapping";
import { Tooltip } from "app/components/Charts/geomap/tooltip";
import { geojson } from "app/components/Charts/geomap/features";

// This is the main reason I chose to go with Nivo for this chart,
// Mapbox does not support different projectionTypes and has the Mercator style as default.
// 'naturalEarth1' comes closes to our needs.
const projectionType = [
  "mercator",
  "naturalEarth1",
  "equirectangular",
  "equalEarth",
];

const GeomapContainerStyle = (isLocked: boolean) => {
  return css`
    width: auto;
    height: 442px;
    margin: auto;
    margin-bottom: 19px;

    * > path:hover {
      fill: ${!isLocked && ProjectPalette.primary.main};
      cursor: ${!isLocked && "pointer"};
    }
  `;
};

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
const marginMobile = { top: -10, right: 10, bottom: -10, left: -40 };

// Please refer to https://nivo.rocks/choropleth and https://nivo.rocks/geo to see all available options.
export function Geomap({ geoData }) {
  const [tooltip, setTooltip] = React.useState("");
  const [isLocked, setIsLocked] = React.useState(false);
  const mobile = useMediaQuery("(max-width:960px)");
  const [width] = useWindowSize();
  const widthRef = React.useRef();
  const [currentLanguage] = useRecoilState(languageAtom);
  const [projectionScale, setProjectionScale] = React.useState(190);
  const [projectionTranslation, setProjectionTranslation] = React.useState([
    0.45,
    0.59,
  ]);

  React.useEffect(() => {
    widthRef.current = width;
  });

  React.useEffect(() => {
    switch (true) {
      case width >= 900:
        setProjectionScale(188);
        setProjectionTranslation([0.45, 0.59]);
        break;
      case width >= 850:
        setProjectionScale(188);
        setProjectionTranslation([0.48, 0.59]);
        break;
      case width >= 800:
        setProjectionScale(178);
        setProjectionTranslation([0.5, 0.59]);
        break;
      case width >= 750:
        setProjectionScale(168);
        setProjectionTranslation([0.52, 0.59]);
        break;
      case width >= 700:
        setProjectionScale(158);
        setProjectionTranslation([0.54, 0.59]);
        break;
      case width >= 650:
        setProjectionScale(148);
        setProjectionTranslation([0.54, 0.59]);
        break;
      default:
        setProjectionScale(188);
        setProjectionTranslation(0.45, 0.59);
    }
  }, [width]);

  function handleCountryClick() {
    if (!isLocked && tooltip.data != null) {
      setIsLocked(true);
    }
  }

  function handleCountryHover(hoveredCountry: any) {
    if (hoveredCountry.feature.label !== tooltip.label && !isLocked) {
      setTooltip(() => hoveredCountry.feature);
    }
    return null;
  }

  return (
    <div css={GeomapContainerStyle(isLocked)}>
      <ResponsiveChoropleth
        aria-label="Geographical map which displays the disbursed amount in euro's per country"
        data={geoData}
        features={geojson.features} // Providing a country only view is possible by changing the features, see this:
        margin={mobile ? marginMobile : margin}
        colors={colorScheme}
        domain={[0, get(maxBy(geoData, "value"), "value", 0)]} // Scale of values.
        unknownColor="#E3E3E3" // This color is used when there is no available data for that country code.
        label="properties.name"
        projectionType={projectionType[1]}
        projectionScale={projectionScale}
        projectionTranslation={projectionTranslation}
        borderWidth={1}
        borderColor="#343249"
        layers={["features"]}
        onClick={(country) =>
          mobile
            ? handleCountryHover({ feature: country })
            : handleCountryClick()
        }
        isInteractive
        tooltip={(country) => handleCountryHover(country)}
      />
      {tooltip.data && (
        <Tooltip
          isLocked={isLocked}
          value={tooltip.value}
          ISO2Code={getCountryISO2(tooltip.id)}
          type={get(geoData, "label", "activities")}
          label={tooltip.data[getName(currentLanguage)]}
          handleLockClick={() => setIsLocked(!isLocked)}
        />
      )}
    </div>
  );
}
