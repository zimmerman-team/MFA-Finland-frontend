import { Grid } from "@material-ui/core";
import React from "react";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

interface ToolBoxProps {}

export const ToolBox = (props: ToolBoxProps) => {
  <div>
    <div>icon 1</div>
    <div>icon 2</div>
    <div>icon 3</div>
  </div>;
};

interface GridWidgetProps {
  label?: string;
  tooltip?: boolean;
  height?: string;
}

export const GridWidget = (props: GridWidgetProps) => {
  return (
    <div
      css={`
        width: 100%;
        height: ${props.height ? props.height : "328px"};
        background-color: white;
        display: flex;
        border-radius: 32px;
        padding: 32px;
      `}
    >
      <header
        css={`
          width: 100%;
          display: flex;
          align-items: center;
          height: 24px;
        `}
      >
        <div
          css={`
            font-style: normal;
            font-weight: bold;
            font-size: 18px;
            color: #2e4982;
            opacity: 0.9;
            line-height: 1;
          `}
        >
          {props.label}
        </div>
        <div
          css={`
            margin-left: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <InfoOutlinedIcon
            css={`
              fill: #bcc6d6;
            `}
          />
        </div>
        {/*<div>tooltip</div>*/}
      </header>
      {/*<div>content</div>*/}
    </div>
  );
};

export const LandingLayout = () => {
  return (
    <Grid container spacing={2}>
      {/* ----------------------------------- */}
      {/* row 1 */}
      <Grid item xs={12} sm={12} md={12} lg={8}>
        <GridWidget label="Overview Disbursements" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <GridWidget label="Thematic Areas" />
      </Grid>
      {/* ----------------------------------- */}
      {/* row 2 */}
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <GridWidget label="Sectors" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <GridWidget label="Regions" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <GridWidget label="Organisations" />
      </Grid>
      {/* ----------------------------------- */}
      {/* row 3 */}
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <GridWidget label="Budget Lines" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <GridWidget label="Result" />
      </Grid>
      {/* ----------------------------------- */}
      {/* row 4 */}
      <Grid item xs={12} sm={12} md={12} lg={8}>
        <GridWidget label="SDG's" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <GridWidget label="About" />
      </Grid>
      {/* ----------------------------------- */}
      {/* row 5 */}
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <GridWidget label="Map" height="680px" />
      </Grid>
    </Grid>
  );
};
