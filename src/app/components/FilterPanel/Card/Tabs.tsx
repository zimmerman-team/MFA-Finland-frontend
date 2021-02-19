import React from "react";
import { css } from "styled-components/macro";
import { PrimaryColor, SecondaryColor } from "app/theme";
import { useRecoilState } from "recoil";
import { filterCardTabsAtom } from "../../../state/recoil/atoms";
import { PillButton } from "../../Buttons/PillButton";

interface TabProps {
  index: number;
  name: string;
  active: boolean;
}

const tabStyle = (active: boolean) => css`
  color: ${PrimaryColor[0]};
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  background-color: ${active ? "white" : SecondaryColor[1]};
  border-radius: 20px;
  padding: 3px 12px;
  text-transform: unset;
  width: 66px;

  :first-of-type {
    min-width: 42px;
    width: 42px;
    margin-right: 16px;
  }

  :hover {
    cursor: ${active ? "initial" : "pointer"};
    background-color: ${active ? "white" : SecondaryColor[1]};
  }
`;

const Tab = (props: TabProps): JSX.Element => {
  const [tabs, setTabs] = useRecoilState(filterCardTabsAtom);

  function handleTabClick(index: number) {
    setTabs((tabs) => {
      const newTabsState: any = Object.create(tabs);
      newTabsState.forEach((tab: any) => {
        tab.active = false;
      });
      newTabsState[index].active = true;
      return newTabsState;
    });
  }

  return (
    <PillButton
      css={tabStyle(props.active)}
      onClick={() => handleTabClick(props.index)}
    >
      {props.name}
    </PillButton>
  );
};

export const Tabs = () => {
  const [tabs, setTabs] = useRecoilState(filterCardTabsAtom);

  return (
    <div>
      {tabs.map((tab, index) => {
        return (
          <Tab
            key={tab.name}
            index={index}
            name={tab.name}
            active={tab.active}
          />
        );
      })}
    </div>
  );
};
