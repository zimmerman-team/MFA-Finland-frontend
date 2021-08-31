// @ts-nocheck
import React from "react";
import get from "lodash/get";
import { InPageNavModel } from "app/components/InPageNavigation/model";
import styled, { css, StyledFunction } from "styled-components/macro";
import Box from "@material-ui/core/Box";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { InPageNavItem } from "app/components/InPageNavigation/InPageNavItem";
import { ActivityItemProps } from "app/modules/activity-detail-module/common/Activity/model";

import { useHistory } from "react-router-dom";
import findIndex from "lodash/findIndex";

const inPageNavigationStyle = css`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 75px;
`;

const iconStyle = css`
  font-size: 35px;
`;

const Controls = styled((props) => <Box {...props} />)`
  && {
    padding-left: 73px;
    display: flex;
    flex-direction: row;
    color: #a1aebd;

    > * {
      margin-right: 24px;
    }

    > svg {
      cursor: pointer;
    }
  }
`;

interface AnchorProps {
  id: string | number;
  positionRelativeToTop: number;
}

const anchor: StyledFunction<AnchorProps & React.HTMLProps<HTMLInputElement>> =
  styled.span;

export const Anchor = anchor`
  margin-top: -${(props: AnchorProps) =>
    props.positionRelativeToTop ? props.positionRelativeToTop : 56}px;        
  padding-bottom: ${(props: AnchorProps) =>
    props.positionRelativeToTop ? props.positionRelativeToTop : 56}px; 
  display: block; 
`;

export function InPageNavigation(props: InPageNavModel) {
  const history = useHistory();

  function isDisabled(item: ActivityItemProps, data: ActivityMetadata) {
    if (!data) {
      return false;
    }
    const itemData = get(data, item.dataPath, null);
    if (Array.isArray(itemData)) {
      return itemData.length === 0;
    }
    if (itemData) {
      return false;
    }
    return true;
  }

  React.useEffect(() => {
    history.listen((location: any) => {
      const hash = location.hash.replace("#", "");
      let fItemIndex = findIndex(props.lists, { path: hash });
      fItemIndex = fItemIndex === -1 ? 0 : fItemIndex;
    });
    return () => {
      window.location.hash = "";
    };
  }, []);

  function handleClickUp() {
    const { active, setActive, lists } = props;

    if (active !== 0) {
      setActive(active - 1);
      window.location.hash = lists[active - 1].path;
      setActive(active - 1);
    }
  }

  function handleClickDown() {
    const { active, setActive, lists } = props;

    if (active + 1 < lists.length) {
      window.location.hash = lists[active + 1].path;
      setActive(active + 1);
    }
  }

  return (
    <div css={inPageNavigationStyle}>
      {props.lists.map((item: ActivityItemProps, index: number) => (
        <InPageNavItem
          {...item}
          onClick={(e: React.SyntheticEvent) =>
            props.handleClick && props.handleClick(e.currentTarget.id)
          }
          active={props.active === index}
          setActive={props.setActive}
          id={index}
          key={index}
          disabled={isDisabled(item, props.actualData)}
          label={
            props.cmsData
              ? get(props.cmsData, item.cmsKey, item.label)
              : item.label
          }
        />
      ))}
      <Controls>
        <ArrowDownwardIcon css={iconStyle} onClick={() => handleClickDown()} />
        <ArrowUpwardIcon css={iconStyle} onClick={() => handleClickUp()} />
      </Controls>
    </div>
  );
}
