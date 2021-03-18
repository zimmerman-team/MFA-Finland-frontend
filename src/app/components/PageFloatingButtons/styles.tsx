import { css } from "styled-components/macro";
import { makeStyles } from "@material-ui/core";

export const containercss = css`
  display: flex;
  flex-direction: column;
  //margin-right: 25px;
`;

export const buttonscontainercss = css`
  display: flex;
  position: fixed;
  flex-direction: column;
  z-index: 4;
  transform: translateX(-44px);
`;

export const buttoncss = css`
  width: 32px;
  height: 32px;
  margin: 8px 0;
  display: flex;
  cursor: pointer;
  background: #fff;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0px 1px 8px rgba(0, 0, 0, 0.12));
`;

export const tooltipCreateStyles = makeStyles({
  tooltip: {
    borderRadius: "15px",
    padding: "9px 0 13px 18px",
  },
});
