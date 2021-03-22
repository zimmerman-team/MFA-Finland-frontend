import React from "react";
import get from "lodash/get";
import { useRecoilState } from "recoil";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { searchFocusAtom } from "app/state/recoil/atoms";
import { PrimaryColor, SecondaryColor } from "app/theme";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

type Props = {
  cmsData: any;
  value: string;
  setValue: Function;
};

const StyledInput = withStyles((theme: Theme) =>
  createStyles({
    input: {
      padding: 10,
      fontSize: 14,
      borderRadius: 32,
      color: PrimaryColor[0],
      backgroundColor: "#bcc6d6",
      "::placeholder": {
        color: SecondaryColor[2],
      },
    },
  })
)(InputBase);

export const SearchField = (props: Props) => {
  const [isFocused, setIsFocused] = useRecoilState(searchFocusAtom);

  return (
    <StyledInput
      css={`
        width: ${isFocused ? "600px" : "144px"};
        @media (min-width: 992px) {
          transition: width 0.5s ease-in-out;
        }
        @media (max-width: 992px) {
          width: ${isFocused ? "calc(100vw - 165px)" : "144px"};
        }
      `}
      value={props.value}
      data-cy="search-field"
      onChange={(e) => props.setValue(e.target.value)}
      placeholder={get(props.cmsData, "general.search", "Search")}
      endAdornment={
        <div
          css={`
            right: 0px;
            width: 32px;
            height: 32px;
            display: flex;
            position: absolute;
            border-radius: 50%;
            align-items: center;
            justify-content: center;
            background-color: ${PrimaryColor[2]};
          `}
        >
          <SearchIcon
            css={`
              fill: ${PrimaryColor[0]};
            `}
          />
        </div>
      }
      onFocus={() => setIsFocused(true)}
    />
  );
};
