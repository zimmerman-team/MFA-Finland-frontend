import React from "react";
import { css } from "styled-components/macro";
import { FilterProps } from "app/components/FilterPanel/data";
import { CardHeader } from "app/components/FilterPanel/Card/CardHeader";
import { CardContent } from "app/components/FilterPanel/Card/CardContent";
import { CardContentPeriod } from "app/components/FilterPanel/Card/PeriodCardContent";

export const Card = (props: FilterProps) => {
  const styles = {
    container: css`
      border: 1px solid #bcc6d6;
      border-radius: 20px;
      padding: 15px 12px 24px 24px;
      margin-left: 104px;
      max-width: 816px;
      height: 534px;
      @media (max-width: 600px) {
        max-width: initial;
        width: 100%;
        padding: initial !important;
        border: none;
        margin: initial;
      }
    `,
  };

  return (
    <>
      {props.title === "Period" ? (
        <CardContentPeriod {...props} />
      ) : (
        <div css={styles.container}>
          <CardHeader />
          <CardContent {...props} />
        </div>
      )}
    </>
  );
};
