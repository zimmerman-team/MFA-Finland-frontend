import { css } from "styled-components/macro";
import React from "react";
import { Checkbox, LinearProgress, Typography } from "@material-ui/core";
import { Tabs } from "./Tabs";
import { CheckboxListItem } from "../ListItems/CheckboxListItem";
import { CheckboxGridListItem } from "../ListItems/CheckboxGridListItem";
import { AccordionListItem } from "../ListItems/AccordionListItem";
import { FilterProps } from "../Panels/Filter";
import { PrimaryColor } from "../../../theme";
import { CardContentPeriod } from "./PeriodCardContent";

export interface FilterOption {
  name: string;
  code: string;
  children?: FilterOption[];
}

export const Card = (props: FilterProps) => {
  const styles = {
    container: css`
      border: 1px solid #bcc6d6;
      border-radius: 20px;
      padding: 15px 12px 24px 24px;
      margin-left: 104px;
      max-width: 816px;
      height: 534px;
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

const CardHeader = () => {
  const styles = {
    container: css`
      position: sticky;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 12px;
      margin-bottom: 22px;
    `,
    checkbox: css`
      color: white;
    `,
    checkboxLabel: css`
      color: white;
      text-transform: unset;
      margin-right: 24px;
    `,
  };
  return (
    <div css={styles.container}>
      <Tabs />
      <span>
        <Checkbox id="select_all" css={styles.checkbox} color="default" />
        <Typography variant="button" css={styles.checkboxLabel}>
          Select all
        </Typography>
      </span>
    </div>
  );
};

const CardContent = (props: FilterProps) => {
  const { data } = props;
  const styles = {
    container: css`
      height: 428px;
      overflow-x: hidden;
      overflow-y: auto;
      padding-right: 24px;

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
    `,
  };
  //TODO: if anyone knows a way to improve the simplicity/readability of this render function please refactor
  function renderContent(): JSX.Element | undefined {
    if (data && data.length >= 1) {
      return (
        <>
          {data.map((node1) => {
            if (node1.children) {
              const containsChildren = node1.children.some((node2) => {
                return node2.children !== undefined;
              });
              if (containsChildren) {
                // Component with 3 drilldown levels
                return (
                  <AccordionListItem
                    node={node1}
                    style="has2NodesStyle"
                    component={
                      <>
                        {node1.children.map((node2) => {
                          return (
                            <AccordionListItem
                              node={node2}
                              component={<CheckboxGridListItem {...node2} />}
                              style="has2NodesStyle"
                            />
                          );
                        })}
                      </>
                    }
                  />
                );
              } else {
                // Component with 2 drilldown levels
                return (
                  <AccordionListItem
                    node={node1}
                    component={<CheckboxGridListItem {...node1} />}
                    style="has1NodeStyle"
                  />
                );
              }
            } else {
              // Component with 1 drilldown level
              return <CheckboxListItem {...node1} />;
            }
          })}
        </>
      );
    } else {
      return <LinearProgress />;
    }
  }

  return <div css={styles.container}>{renderContent()}</div>;
};
