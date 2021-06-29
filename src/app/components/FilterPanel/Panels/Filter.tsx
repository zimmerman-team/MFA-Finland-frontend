import React from "react";
import filter from "lodash/filter";
import { css } from "styled-components/macro";
import { Grid, Typography } from "@material-ui/core";
import { Card } from "app/components/FilterPanel/Card";
import { FilterOption, FilterProps } from "app/components/FilterPanel/data";
import { Header } from "app/components/FilterPanel/Card/Header";
import { BottomActions } from "app/components/FilterPanel/Card/BottomActions";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export const createStyles = (props: FilterProps) => {
  return {
    container: css``,
    selected: css`
      height: 14px;
      margin-left: 104px;
      color: white;
      font-size: 12px;
      line-height: 14px;
      font-weight: 400;
      margin-top: 8px;
      margin-bottom: 2px;

      @media (max-width: 600px) {
        display: none;
      }
    `,
    bottomActionsContainer: css`
      display: flex;
      justify-content: flex-end;
      max-width: ${props.title === "Period" ? "712px" : "920px"};

      @media (max-width: 600px) {
        flex-direction: column;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
      }
    `,
  };
};

export const Filter = (props: FilterProps) => {
  const styles = createStyles(props);
  const [searchKey, setSearchKey] = React.useState("");
  const [options, setOptions] = React.useState(props.data);
  const mobile = useMediaQuery("(max-width: 600px)");

  function formatSelectedValues() {
    return `${props.selection.join(" ")} are selected`;
  }

  React.useEffect(() => {
    if (searchKey === "") {
      setOptions(props.data);
    } else {
      const fvalue = searchKey.toLowerCase();
      const updatedOptions: FilterOption[] = [];
      (props.data || []).forEach((item: FilterOption) => {
        const cat = item.name.toLowerCase().indexOf(fvalue) > -1;
        if (cat) {
          updatedOptions.push(item);
        } else if (item.children) {
          const children = filter(
            item.children,
            (child: any) => child.name.toLowerCase().indexOf(fvalue) > -1
          );
          if (children.length > 0) {
            updatedOptions.push({ ...item, children });
          }
        }
      });
      setOptions(updatedOptions);
    }
  }, [searchKey, props.data]);

  return (
    <Grid container item direction="column" css={styles.container}>
      <Header {...props} searchKey={searchKey} setSearchKey={setSearchKey} />
      <Card {...props} data={options} />
      {!props.isPeriod && (
        <Typography variant="caption" css={styles.selected}>
          {formatSelectedValues()}
        </Typography>
      )}
      <div css={styles.bottomActionsContainer}>
        {mobile && props.selection.length > 0 && (
          <div
            css={`
              width: 100%;
              background-color: #bcc6d6;
              height: 24px;
              padding: 6px 16px;
            `}
          >
            {formatSelectedValues()}
          </div>
        )}
        <BottomActions
          onApply={props.onApplyFilters}
          onReset={props.onResetFilter}
        />
      </div>
    </Grid>
  );
};
