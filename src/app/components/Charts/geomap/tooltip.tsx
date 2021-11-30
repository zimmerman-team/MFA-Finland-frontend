import React from "react";
import get from "lodash/get";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { css } from "styled-components/macro";
import { useCMSData } from "app/hooks/useCMSData";
import { Lock, LockOpen } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import { languageAtom } from "app/state/recoil/atoms";
import IconButton from "@material-ui/core/IconButton";
import { PrimaryColor, ProjectPalette } from "app/theme";
import { PillButton } from "app/components/Buttons/PillButton";
import { formatLargeAmountsWithPrefix } from "app/utils/formatMoneyWithPrefix";

interface TooltipModel {
  label: string;
  value: number | bigint;
  type: string;
  isLocked: boolean;
  handleLockClick: Function;
  ISO2Code: string;
}
export const HeaderContainer = css`
  display: flex;
  justify-content: space-between;
`;

export const Header = css`
  line-height: 22px;
  letter-spacing: unset;
`;

export const ValueLabel = css`
  font-family: Finlandica;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: ${ProjectPalette.primary.main};

  margin-bottom: 8px;
`;

export const Value = css`
  line-height: 29px;
`;

export const ButtonContainerStyle = css`
  display: flex;
  justify-content: flex-end;
`;

export const Container = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  top: -76px;
  @media (max-width: 960px) {
    top: -86px;
    left: 40px;
  }
  left: 40px;
  width: 296px;
  height: 181px;
  background: #ffffff;
  border-radius: 15px;
  filter: drop-shadow(0px 1px 8px rgba(0, 0, 0, 0.12));
  padding: 16px 24px 24px 16px;
`;

export const Icon = css`
  margin-top: -12px;
  margin-right: -12px;
  margin-bottom: -2px;
`;

export const Button = css`
  border-radius: 20px;
  text-transform: unset;
  padding: 4px 12px;
  line-height: 17px;
  :hover {
    background-color: ${PrimaryColor[3]};
  }
`;

export const Tooltip = React.memo(function TooltipMemoized(
  props: TooltipModel
) {
  const cmsData = useCMSData({ returnData: true });
  const [currentLanguage] = useRecoilState(languageAtom);
  return (
    <div css={Container}>
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <div css={HeaderContainer}>
          <Typography variant="h6" color="primary" css={Header}>
            {props.label}
          </Typography>
          <IconButton
            onClick={() => props.handleLockClick()}
            color="primary"
            css={Icon}
          >
            {props.isLocked ? <Lock /> : <LockOpen />}
          </IconButton>
        </div>
        <div css={ValueLabel}>Disbursements</div>
        <Typography variant="h5" css={Value}>
          {formatLargeAmountsWithPrefix(props.value, currentLanguage)}
        </Typography>
      </div>
      <div css={ButtonContainerStyle}>
        <Link
          to={`/${
            currentLanguage === "se" ? "sv" : currentLanguage
          }/countries/${props.ISO2Code}`}
        >
          <PillButton css={Button}>
            {get(cmsData, "viz.mapcountrypagebutton", "Country Page")}
          </PillButton>
        </Link>
      </div>
    </div>
  );
});
