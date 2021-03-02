import React from "react";
import { Slide, Typography } from "@material-ui/core";
import { css } from "styled-components/macro";
import { PlayArrow } from "@material-ui/icons";
import { ResponsivePie } from "@nivo/pie";
import { PillButton } from "../Buttons/PillButton";
import { SecondaryColor } from "../../theme";

export function Collapsable(props: any) {
  const styles = {
    container: css`
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: absolute;
      right: -32px;
      @media (max-width: 960px) {
        right: -15px;
      }
      z-index: 4;
      height: 192px;
    `,
    button: css`
      width: 18px;
      min-width: 18px;
      height: 63px;
      min-height: 63px;
      padding: 0;
      border-radius: 6px;
      :hover {
        background-color: ${SecondaryColor[1]};
      }

      && .MuiButton-startIcon {
        margin: 0;
      }
    `,
    chartContainer: css`
      height: 125px;
      width: 125px;
      margin: 0 auto;
      margin-bottom: 16px;
    `,
    card: css`
      background-color: white;
      padding: 16px;
      height: 258px;
      width: 192px;
      border-radius: 15px;
      filter: drop-shadow(0px 1px 8px rgba(0, 0, 0, 0.12));
      margin-right: 1px;
    `,
    title: css`
      margin-bottom: 24px;
      line-height: 17px;
    `,
    subtitle: css`
      font-family: Finlandica;
      text-transform: unset;
      font-weight: 300;
      font-size: 12px;
      line-height: 14px;
      letter-spacing: normal;
    `,
    rotate: css`
      transform: rotate(180deg);
    `,
  };

  const [isCollapsed, setIsCollapsed] = React.useState(true);

  return (
    <div css={styles.container}>
      <PillButton
        css={styles.button}
        startIcon={
          isCollapsed ? <PlayArrow /> : <PlayArrow css={styles.rotate} />
        }
        onClick={() => setIsCollapsed(!isCollapsed)}
      />
      <Slide direction="left" in={isCollapsed} mountOnEnter unmountOnExit>
        <div css={styles.card}>
          <Typography variant="subtitle2" css={styles.title}>
            Geographically unallocable ODA
          </Typography>
          <div css={styles.chartContainer}>
            <PieChart
              data={[
                {
                  id: "unallocable",
                  label: "unallocable",
                  value: props.unallocable,
                },
                {
                  id: "rest",
                  label: "rest",
                  value: 100 - props.unallocable,
                },
              ]}
            />
          </div>
          <Typography variant="overline" css={styles.subtitle}>
            {props.unallocable}% of actual exclusive ODA is NOT showing on the
            map.
          </Typography>
        </div>
      </Slide>
    </div>
  );
}

interface PieProps {
  data: any;
}

const colors: any = { unallocable: "#233C71", rest: "#A8BBE4" };

const PieChart = (props: PieProps) => {
  const styles = {
    container: css`
      height: 125px;
      width: 125px;
      margin: 0 auto;
      margin-bottom: 16px;
      position: relative;
    `,
    counter: css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `,
  };

  return (
    <div css={styles.container}>
      <Typography variant="subtitle2" css={styles.counter}>
        {props.data[0].value}%
      </Typography>
      <ResponsivePie
        data={props.data}
        margin={{ top: 1, right: 1, bottom: 1, left: 1 }}
        innerRadius={0.75}
        padAngle={2}
        colors={(bar: any) => colors[bar.id]}
        borderWidth={0.5}
        borderColor="#14141d"
        enableRadialLabels={false}
        enableSliceLabels={false}
        isInteractive={false}
      />
    </div>
  );
};
