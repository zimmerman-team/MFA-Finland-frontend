import { css } from "styled-components/macro";
import React from "react";
import { LinearProgress } from "@material-ui/core";
import { CheckboxListItem } from "../ListItems/CheckboxListItem";
import { CheckboxGridListItem } from "../ListItems/CheckboxGridListItem";
import { AccordionListItem } from "../ListItems/AccordionListItem";
import { FilterProps } from "../Panels/Filter";
import { PrimaryColor } from "../../../theme";

export const CardContent = (props: FilterProps) => {
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

      @media (max-width: 600px) {
        padding-right: initial;
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
