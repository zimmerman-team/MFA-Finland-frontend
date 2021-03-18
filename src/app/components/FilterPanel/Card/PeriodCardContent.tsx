import React from "react";
import { useUpdateEffect } from "react-use";
import { css } from "styled-components/macro";
import { Typography } from "@material-ui/core";
import { PrimaryColor, SecondaryColor } from "app/theme";
import { FilterProps } from "app/components/FilterPanel/data";
import { PillButton } from "app/components/Buttons/PillButton";

// TODO: disabled yearbutton state
// TODO: disabled apply button if begin year < end year
// TODO: nice to have, scroll to current selected year position

const createStyles = (fromActive: boolean, toActive: boolean) => {
  return {
    container: css`
      margin-left: 104px;
      max-width: 608px;
      @media (max-width: 600px) {
        margin-left: 0;
        max-width: initial;
      }
    `,
    formControl: css`
      display: flex;
      flex-direction: column;
      width: 100%;
    `,
    label: css`
      color: #bcc6d6;
      margin-bottom: 4px;
    `,
    from: css`
      border-radius: 32px;
      color: ${fromActive ? PrimaryColor[0] : "white"};
      background-color: ${fromActive ? "#BCC6D6" : "#4F6797"};
      margin-right: 16px;
      height: 36px;
      font-size: 18px;
      justify-content: flex-start;

      :hover {
        background-color: ${SecondaryColor[1]};
      }
    `,
    to: css`
      border-radius: 32px;
      color: ${toActive ? PrimaryColor[0] : "white"};
      background-color: ${toActive ? "#BCC6D6" : "#4F6797"};
      height: 36px;
      justify-content: flex-start;
      font-size: 18px;

      :hover {
        background-color: ${SecondaryColor[1]};
      }
    `,
    inputContainer: css`
      margin-top: 4px;
      display: flex;
      justify-content: flex-start;
      width: 100%;
      margin-bottom: 16px;
    `,
    cardContainer: css`
      max-width: 608px;
      max-height: 356px;
      border: 1px solid #bcc6d6;
      border-radius: 20px;
      padding: 17px 12px 17px 20px;
      margin-bottom: 24px;
      @media (max-width: 600px) {
        margin-left: 0;
        max-width: initial;
        max-height: initial;
        border: none;
        padding: 0;
      }
    `,
    cardContentContainer: css`
      height: 320px;
      overflow-x: hidden;
      overflow-y: auto;
      padding-right: 24px;
      padding-bottom: 2px;
      &::-webkit-scrollbar {
        width: 4px;
        border-radius: 4px;
        background: transparent;
      }

      &::-webkit-scrollbar-track {
        border-radius: 4px;
        background: ${PrimaryColor[0]};
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background: white;
      }

      ::-webkit-scrollbar-button {
        width: 0;
        height: 0;
        display: none;
      }

      ::-webkit-scrollbar-corner {
        background-color: transparent;
      }

      @media (max-width: 600px) {
        padding: initial;
      }
    `,
  };
};

const buttonStyles = (active: boolean) => {
  return css`
    width: 52px;
    min-width: 52px;
    margin: 0 12px;
    height: 52px;
    padding: 6px 10px;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    border-radius: 50%;
    box-shadow: none;
    background-color: ${active ? "white" : "unset"};
    color: ${active ? PrimaryColor[0] : "white"};
    :hover {
      box-shadow: none;
      background-color: ${SecondaryColor[1]};
    }
  `;
};

const yearLow = 2015;
const yearHigh = 2025;

export const CardContentPeriod = (props: FilterProps) => {
  const [selectedFromYear, setSelectedFromYear] = React.useState(
    props.selectedItems[0] || yearLow
  );
  const [selectedToYear, setSelectedToYear] = React.useState(
    props.selectedItems[1] || yearHigh
  );
  const [fromActive, setFromActive] = React.useState(true);
  const [toActive, setToActive] = React.useState(false);
  const [yearButtonActive, setYearButtonActive] = React.useState(
    selectedFromYear
  );

  const years = [];
  for (let i = yearLow; i <= yearHigh; i++) {
    years.push(i);
  }

  const styles = createStyles(fromActive, toActive);

  function handleFromClick() {
    if (!fromActive) {
      setFromActive(!fromActive);
      setToActive(!toActive);
      setYearButtonActive(selectedFromYear);
    }
  }

  function handleToClick() {
    if (!toActive) {
      setToActive(!toActive);
      setFromActive(!fromActive);
      setYearButtonActive(selectedToYear);
    }
  }

  function handleYearClick(year: number) {
    if (fromActive) {
      setYearButtonActive(year);
      setSelectedFromYear(year);
    } else if (toActive) {
      setYearButtonActive(year);
      setSelectedToYear(year);
    }
  }

  useUpdateEffect(() => {
    props.onFilterCheckboxChange(`${selectedFromYear},${selectedToYear}`);
  }, [selectedFromYear, selectedToYear]);

  return (
    <div css={styles.container}>
      <div css={styles.inputContainer}>
        {/* ------------------------------------------------- */}
        {/* from */}
        <div css={styles.formControl}>
          <Typography variant="body2" css={styles.label}>
            Year (From)
          </Typography>
          <PillButton
            id="from"
            css={styles.from}
            active={fromActive}
            onClick={() => handleFromClick()}
          >
            {selectedFromYear}
          </PillButton>
        </div>
        {/* ------------------------------------------------- */}
        {/* to */}
        <div css={styles.formControl}>
          <Typography variant="body2" css={styles.label}>
            Year (To)
          </Typography>
          <PillButton
            id="to"
            css={styles.to}
            active={toActive}
            onClick={() => handleToClick()}
          >
            {selectedToYear}
          </PillButton>
        </div>
      </div>
      {/* ------------------------------------------------- */}
      {/* range */}
      <div css={styles.cardContainer}>
        <div css={styles.cardContentContainer}>
          {years.map((year) => {
            return (
              <PillButton
                id={`button-${year}`}
                key={`button-${year}`}
                css={buttonStyles(year === yearButtonActive)}
                onClick={() => handleYearClick(year)}
              >
                {year}
              </PillButton>
            );
          })}
        </div>
      </div>
    </div>
  );
};
