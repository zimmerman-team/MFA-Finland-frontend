import React from "react";
import { css } from "styled-components/macro";

interface TotalDisbursementsProps {
  totalDisbursements: number;
  totalCommitments: number;
}

const style = {
  barContainer: css`
    display: flex;
    width: 100%;
    height: 8px;
    background-color: #dde3eb;
    border-radius: 10px;
    margin-bottom: 15px;
    margin-top: 50px;
  `,
  barFill: css`
    display: flex;
    width: ${percentage(7000, 10000)}%;
    height: 8px;
    background-color: #2e4982;
    border-radius: 10px;
    justify-content: flex-end;
  `,
  barIndicator: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #2e4982;
    border-radius: 50%;
    transform: translateX(20px) translateY(-45px);
  `,
  indicatorText: css`
    color: white;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.5px;
  `,
  textContainer: css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    text-align: center;
  `,
  divider: css`
    width: 1px;
    height: 30px;
    background-color: #2e4982;
    margin-left: 15px;
    margin-right: 15px;
    transform: rotate(15deg);
  `,
};

function percentage(num: number, nam: number) {
  return (num / nam) * 100;
}

export const TotalDisbursements = (props: TotalDisbursementsProps) => {
  const totalProgress = percentage(
    props.totalDisbursements,
    props.totalCommitments
  );

  return (
    <React.Fragment>
      {/* bar container */}
      <div css={style.barContainer}>
        {/* bar fill */}
        <div
          css={`
            display: flex;
            width: ${totalProgress}%;
            height: 8px;
            background-color: #2e4982;
            border-radius: 10px;
            justify-content: flex-end;
          `}
        >
          {/* bar indicator */}
          <div css={style.barIndicator}>
            {/* indicator text */}
            <span css={style.indicatorText}>{totalProgress}%</span>
            {/* <div
              css={`
                width: 20px;
                height: 20px;
                background-color: red;

                transform: rotate(45deg) translateX(20px) translateY(-45px);
              `}
            /> */}
          </div>
        </div>
      </div>

      {/* text container */}
      <div css={style.textContainer}>
        <div>
          <div>Total Disbursements</div>
          <div
            css={`
              font-weight: bold;
            `}
          >
            € {props.totalDisbursements}
          </div>
        </div>

        {/* divider */}
        <div css={style.divider} />

        <div>
          <div>Total Commitments</div>
          <div
            css={`
              font-weight: bold;
            `}
          >
            € {props.totalCommitments}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
