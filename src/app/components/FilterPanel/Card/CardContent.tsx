import React from "react";
import { PrimaryColor } from "app/theme";
import { css } from "styled-components/macro";
import { LinearProgress } from "@material-ui/core";
import { FilterProps } from "app/components/FilterPanel/data";
import { CheckboxListItem } from "app/components/FilterPanel/ListItems/CheckboxListItem";
import { AccordionListItem } from "app/components/FilterPanel/ListItems/AccordionListItem";
import { CheckboxGridListItem } from "app/components/FilterPanel/ListItems/CheckboxGridListItem";

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
  // TODO: if anyone knows a way to improve the simplicity/readability of this render function please refactor
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
                    key={node1.name}
                    node={node1}
                    style="has2NodesStyle"
                    selected={props.selectedItems.indexOf(node1.code) > -1}
                    component={
                      <>
                        {node1.children.map((node2) => {
                          return (
                            <AccordionListItem
                              key={node2.name}
                              node={node2}
                              component={
                                <CheckboxGridListItem
                                  {...node2}
                                  selectedItems={props.selectedItems}
                                  onFilterCheckboxChange={
                                    props.onFilterCheckboxChange
                                  }
                                />
                              }
                              style="has2NodesStyle"
                              selected={
                                props.selectedItems.indexOf(node2.code) > -1
                              }
                            />
                          );
                        })}
                      </>
                    }
                  />
                );
              }
              // Component with 2 drilldown levels
              return (
                <AccordionListItem
                  key={node1.name}
                  node={node1}
                  component={
                    <CheckboxGridListItem
                      {...node1}
                      selectedItems={props.selectedItems}
                      onFilterCheckboxChange={props.onFilterCheckboxChange}
                    />
                  }
                  style="has1NodeStyle"
                  selected={props.selectedItems.indexOf(node1.code) > -1}
                />
              );
            }
            // Component with 1 drilldown level
            return (
              <CheckboxListItem
                {...node1}
                key={node1.name}
                onFilterCheckboxChange={props.onFilterCheckboxChange}
                selected={props.selectedItems.indexOf(node1.code) > -1}
              />
            );
          })}
        </>
      );
    }
    return <LinearProgress />;
  }

  return <div css={styles.container}>{renderContent()}</div>;
};
