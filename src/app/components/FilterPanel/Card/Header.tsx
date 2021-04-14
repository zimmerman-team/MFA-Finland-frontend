import React from "react";
import get from "lodash/get";
import { css } from "styled-components/macro";
import { useCMSData } from "app/hooks/useCMSData";
import { ArrowBackIos } from "@material-ui/icons";
import { IconButton, Typography } from "@material-ui/core";
import { SearchPlaceholder } from "app/components/AppBar/sort/SearchPlaceholder";
import { SearchField } from "app/components/AppBar/common/Search/common/SearchField";

interface HeaderProps {
  title: string;
  searchKey: string;
  renderSearch?: boolean;
  onBackBtnClick: () => void;
  setSearchKey: (searchKey: string) => void;
}

const createStyles = (title: string) => {
  return {
    container: css`
      display: flex;
      max-width: 920px;
      margin-bottom: 16px;

      @media (max-width: 600px) {
        max-width: initial;
        flex-direction: column;
      }
    `,
    backButton: css`
      margin-top: -12px;
      margin-left: -12px;
      margin-right: 68px;
      height: max-content;

      @media (max-width: 600px) {
        margin-right: initial;
      }
    `,
    rightSideContainer: css`
      width: 100%;
      display: flex;

      @media (max-width: 600px) {
        align-items: center;
      }
      //flex-direction: column;
      //flex-wrap: wrap;
    `,
    subtitle: css`
      color: white;
      line-height: 22px;
      margin-bottom: ${title == "Period" ? "10px" : "7px"};

      @media (max-width: 600px) {
        width: 100%;
        font-size: 14px;
        margin-bottom: 0;
      }
    `,
    titleContainer: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      @media (max-width: 600px) {
        width: 100%;
        flex-wrap: wrap;
      }
    `,
    title: css`
      color: white;
      line-height: 22px;
      @media (max-width: 600px) {
        width: 100%;
        margin-bottom: 16px;
        font-size: 14px;
      }
    `,
  };
};

export const Header = (props: HeaderProps) => {
  const styles = createStyles(props.title);
  const cmsData = useCMSData({ returnData: true });
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div css={styles.container}>
      <div css={styles.rightSideContainer}>
        <IconButton css={styles.backButton} onClick={props.onBackBtnClick}>
          <ArrowBackIos style={{ color: "white" }} />
        </IconButton>

        <div>
          <Typography variant="h6" css={styles.subtitle}>
            {get(cmsData, "filters.addfilters", "Add Filters")}
          </Typography>
          <Typography variant="h5" css={styles.title}>
            {props.title}
          </Typography>
        </div>
      </div>
      {props.renderSearch && (
        <SearchField
          cmsData={cmsData}
          isFocused={isFocused}
          value={props.searchKey}
          setIsFocused={setIsFocused}
          setValue={props.setSearchKey}
          onBlur={() => setIsFocused(false)}
        />
      )}
    </div>
  );
};
