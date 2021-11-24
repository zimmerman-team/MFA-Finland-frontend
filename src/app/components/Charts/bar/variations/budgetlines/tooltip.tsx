import React from "react";
import get from "lodash/get";
import sumBy from "lodash/sumBy";
import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";
import orderBy from "lodash/orderBy";
import { useRecoilState } from "recoil";
import { useWindowScroll } from "react-use";
import { css } from "styled-components/macro";
import { useCMSData } from "app/hooks/useCMSData";
import { languageAtom } from "app/state/recoil/atoms";
import useMousePosition from "app/hooks/useMousePosition";
import { formatMoneyWithPrefix } from "app/utils/formatMoneyWithPrefix";

const styles = {
  titletext: css`
    color: #002561;
    font-size: 14px;
    line-height: 17px;
    font-weight: bold;
    font-style: normal;
    font-family: Finlandica;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  normaltext: css`
    color: #002561;
    font-size: 12px;
    line-height: 14px;
    font-style: normal;
    font-weight: normal;
    letter-spacing: 0.15px;
    font-family: Finlandica;
  `,
  linelist: css`
    margin: 0;
    padding: 0 10px 0 0;
    list-style-type: none;

    > li {
      width: 100%;
      display: flex;
      flex-direction: row;
      margin-bottom: 10px;
      justify-content: space-between;

      > div {
        display: flex;
        flex-direction: row;
        align-items: center;

        &:nth-of-type(1) {
          width: 70%;

          > div:nth-of-type(2) {
            width: calc(100% - 16px);
          }
        }
        &:nth-of-type(2) {
          width: 30%;
          justify-content: flex-end;
        }
      }
    }
  `,
  circle: (color: string) => css`
    width: 8px;
    height: 8px;
    margin-right: 5px;
    border-radius: 50%;
    background: ${color};
    border: 0.5px solid #2c2c3c;
  `,
};

function formatLines(data: any) {
  const lineKeys = filter(
    Object.keys(data),
    (key: string) =>
      key.indexOf("Color") === -1 &&
      key.indexOf("Code") === -1 &&
      key !== "year"
  );
  const lines = lineKeys.map((key: string) => ({
    name: key,
    value: data[key],
    color: data[`${key}Color`],
  }));
  return orderBy(lines, "value", "desc");
}

export function BudgetLinesBarChartTooltip(props: any) {
  const { x, y } = useMousePosition();
  const windowScroll = useWindowScroll();
  const cmsData = useCMSData({ returnData: true });
  const [currentLanguage] = useRecoilState(languageAtom);
  const [style, setStyle] = React.useState({ top: 0, left: 0 });

  React.useEffect(() => {
    if (window.location.pathname.indexOf("/viz") > -1) {
      setStyle({
        top: y + 20,
        left: x + 20,
      });
    } else {
      setStyle({
        top: y - 100 + windowScroll.y,
        left: x - 350,
      });
    }
  }, [x, y, windowScroll.y]);

  if (isEmpty(props)) {
    return <React.Fragment />;
  }

  const lines = formatLines(props);
  const totalValue = sumBy(lines, "value");

  return (
    <div
      style={style}
      css={`
        width: 400px;
        padding: 16px;
        position: absolute;
        border-radius: 15px;
        background: #ffffff;
        box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.12);
      `}
    >
      <div css={styles.titletext}>Year {props.year}</div>
      <div css="width: 100%;height: 15px;" />
      <div css={styles.titletext}>
        <span>{get(cmsData, "viz.disbursed", "Disbursed")}</span>
        <span>{formatMoneyWithPrefix(totalValue, currentLanguage)}</span>
      </div>
      <div css="width: 100%;height: 15px;" />
      <div css={styles.titletext}>
        <span>{get(cmsData, "general.budgetlines", "Budget Lines")}</span>
        <span>{get(cmsData, "viz.disbursed", "Disbursed")}</span>
      </div>
      <div css="width: 100%;height: 10px;" />
      <ul css={styles.linelist}>
        {lines.map((line: any) => (
          <li key={line.name}>
            <div css={styles.normaltext}>
              <div css={styles.circle(line.color)} />
              <div>{line.name}</div>
            </div>
            <div css={styles.normaltext}>
              {formatMoneyWithPrefix(line.value, currentLanguage)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
