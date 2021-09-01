import React from "react";
import get from "lodash/get";
import { PrimaryColor } from "app/theme";
import { css } from "styled-components/macro";
import { useCMSData } from "app/hooks/useCMSData";
import { Checkbox, Typography } from "@material-ui/core";
import { FilterProps, FilterOption } from "app/components/FilterPanel/data";
import { CardContentPeriod } from "app/components/FilterPanel/Card/PeriodCardContent";
import { CheckboxListItem } from "app/components/FilterPanel/ListItems/CheckboxListItem";
import { AccordionListItem } from "app/components/FilterPanel/ListItems/AccordionListItem";
import { CheckboxGridListItem } from "app/components/FilterPanel/ListItems/CheckboxGridListItem";

export const Card = (props: FilterProps) => {
  const styles = {
    container: css`
      border: 1px solid #bcc6d6;
      border-radius: 20px;
      padding: 15px 12px 24px 24px;
      margin-left: 104px;
      max-width: 816px;
      height: 534px;

      @media (max-width: 600px) {
        border: none;
        padding: 0;
        margin-left: 0;
      }
    `,
  };

  return (
    <>
      {props.isPeriod ? (
        <CardContentPeriod {...props} />
      ) : (
        <div css={styles.container}>
          <CardHeader {...props} />
          <CardContent {...props} />
        </div>
      )}
    </>
  );
};

const CardHeader = (props: FilterProps) => {
  const cmsData = useCMSData({ returnData: true });
  const styles = {
    container: css`
      position: sticky;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 12px;
      margin-bottom: 22px;

      @media (max-width: 600px) {
        margin-left: 0px;
      }
    `,
    checkbox: css`
      color: white;
    `,
    checkboxLabel: css`
      color: white;
      text-transform: unset;
      margin-right: 24px;

      @media (max-width: 600px) {
        margin: 0px;
      }
    `,
  };

  let allDataCount = props.data ? props.data.length : 0;
  if (props.data && props.data.length > 0 && props.data[0].children) {
    props.data.forEach((item: any) => {
      allDataCount += 1;
      if (item.children) {
        allDataCount += item.children.length;
      }
    });
  }

  return (
    <div css={styles.container}>
      <div />
      <span>
        <Checkbox
          id="select_all"
          color="default"
          css={styles.checkbox}
          onChange={props.onSelectAllCheckboxChange}
          checked={
            allDataCount > 0
              ? allDataCount === props.selectedItems.length
              : false
          }
        />
        <Typography variant="button" css={styles.checkboxLabel}>
          {get(cmsData, "filters.selectall", "Select all")}
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

      @media (max-width: 600px) {
        height: 100%;
        padding: 0;
        ::-webkit-scrollbar {
          display: none;
        }
      }
    `,
  };
  // TODO: if anyone knows a way to improve the simplicity/readability of this render function please refactor
  // recursive function...
  function renderContent(): JSX.Element | undefined {
    if (data && data.length >= 1) {
      return (
        <>
          {data.map((node1) => {
            if (node1.children) {
              let containsGrandChildren = false;
              const containsChildren = node1.children.some((node2) => {
                if (node2.children) {
                  containsGrandChildren = node2.children.some((node3) => {
                    return node3.children !== undefined;
                  });
                }
                return node2.children !== undefined;
              });
              if (containsChildren && containsGrandChildren) {
                // Component with 4 drilldown levels
                return (
                  <AccordionListItem
                    key={`${node1.code}-${node1.code}`}
                    node={node1}
                    nodeStyle="has2NodesStyle"
                    onFilterCheckboxChange={props.onFilterCheckboxChange}
                    selected={props.selectedItems.indexOf(node1.code) > -1}
                    component={
                      <>
                        {node1.children.map((node2) => {
                          return (
                            <AccordionListItem
                              key={`${node2.code}-${node2.code}`}
                              node={node2}
                              component={
                                <>
                                  {node2.children?.map((node3) => {
                                    return (
                                      <AccordionListItem
                                        key={`${node3.code}-${node3.code}`}
                                        node={node3}
                                        component={
                                          <CheckboxGridListItem
                                            {...node3}
                                            selectedItems={props.selectedItems}
                                            onFilterCheckboxChange={
                                              props.onFilterCheckboxChange
                                            }
                                          />
                                        }
                                        nodeStyle="has2NodesStyle"
                                        selected={
                                          props.selectedItems.indexOf(
                                            node3.code
                                          ) > -1
                                        }
                                        onFilterCheckboxChange={
                                          props.onFilterCheckboxChange
                                        }
                                      />
                                    );
                                  })}
                                </>
                              }
                              nodeStyle="has2NodesStyle"
                              selected={
                                props.selectedItems.indexOf(node2.code) > -1
                              }
                              onFilterCheckboxChange={
                                props.onFilterCheckboxChange
                              }
                            />
                          );
                        })}
                      </>
                    }
                  />
                );
              }
              if (containsChildren) {
                // Component with 3 drilldown levels
                return (
                  <AccordionListItem
                    key={`${node1.code}-${node1.code}`}
                    node={node1}
                    nodeStyle="has2NodesStyle"
                    onFilterCheckboxChange={props.onFilterCheckboxChange}
                    selected={props.selectedItems.indexOf(node1.code) > -1}
                    component={
                      <>
                        {node1.children.map((node2) => {
                          return (
                            <AccordionListItem
                              key={`${node2.code}-${node2.code}`}
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
                              nodeStyle="has2NodesStyle"
                              selected={
                                props.selectedItems.indexOf(node2.code) > -1
                              }
                              onFilterCheckboxChange={
                                props.onFilterCheckboxChange
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
              let isChecked = false;
              if (node1.code.length === 0) {
                let areParamValuesApplied = true;
                node1.children.forEach((child: FilterOption) => {
                  areParamValuesApplied =
                    areParamValuesApplied &&
                    props.selectedItems.indexOf(child.code) > -1;
                });
                isChecked = areParamValuesApplied;
              } else {
                isChecked = props.selectedItems.indexOf(node1.code) > -1;
              }
              return (
                <AccordionListItem
                  key={`${node1.code}-${node1.code}`}
                  node={node1}
                  selected={isChecked}
                  component={
                    <CheckboxGridListItem
                      {...node1}
                      selectedItems={props.selectedItems}
                      onFilterCheckboxChange={props.onFilterCheckboxChange}
                    />
                  }
                  nodeStyle="has1NodeStyle"
                  onFilterCheckboxChange={props.onFilterCheckboxChange}
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
    return <></>;
  }

  return <div css={styles.container}>{renderContent()}</div>;
};
