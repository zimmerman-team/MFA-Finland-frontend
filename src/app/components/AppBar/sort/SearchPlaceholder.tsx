import React from "react";
import { PrimaryColor, SecondaryColor } from "app/theme";
import { css } from "styled-components/macro";
import SearchIcon from "@material-ui/icons/Search";

export const SearchPlaceholder = () => {
  const styles = {
    container: css`
      width: 144px;
      height: 36px;
      background: #bcc6d6;
      border-radius: 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 2px;
      padding-left: 15px;
      @media (max-width: 600px) {
        width: 100%;
      }
    `,
    label: css`
      color: ${SecondaryColor[2]};
    `,
    iconContainer: css`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: ${PrimaryColor[2]};
    `,
    icon: css`
      fill: ${PrimaryColor[0]};
    `,
  };

  return (
    <div css={styles.container}>
      <div css={styles.label}>Search</div>
      <div css={styles.iconContainer}>
        <SearchIcon css={styles.icon} />
      </div>
    </div>
  );
};
