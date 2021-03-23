import { css } from "styled-components/macro";
import { PrimaryColor } from "app/theme";

export const styles = {
  container: css`
    width: 100%;
    padding: 28px;
    background-color: white;
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.12);
    border-radius: 30px;
  `,
  gridContainer: css`
    .MuiGrid-root {
      flex-grow: 1;
    }
  `,
  paragraphHeader: css`
    margin-bottom: 16px;
  `,
  paragraph: css`
    margin-bottom: 24px;
  `,
  button: css`
    display: flex;
    margin-left: auto;
    margin-top: 12px;
    margin-bottom: 12px;
    border-radius: 20px;
    text-transform: unset;
    padding: 10px 32px;
    line-height: 17px;
    :hover {
      background-color: ${PrimaryColor[3]};
    }
  `,
  loading: css`
    //border: 1px red solid;
    justify-content: center;
    display: flex;
    margin: 412px auto;
  `,
};
