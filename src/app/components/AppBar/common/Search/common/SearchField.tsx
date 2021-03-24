import React from "react";
import get from "lodash/get";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { PrimaryColor, SecondaryColor } from "app/theme";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

type Props = {
  cmsData: any;
  value: string;
  isFocused: boolean;
  smallWidth?: string;
  onBlur?: () => void;
  setValue: (value: string) => void;
  setIsFocused: (isFocused: boolean) => void;
};

const StyledInput = withStyles((theme: Theme) =>
  createStyles({
    input: {
      padding: "10px 0px",
      fontSize: 14,
      borderRadius: 32,
      color: PrimaryColor[0],
      backgroundColor: "#bcc6d6",
    },
  })
)(InputBase);

export const SearchField = (props: Props) => {
  const unfocusedWidth = props.smallWidth ? props.smallWidth : "144px";
  return (
    <StyledInput
      css={`
        width: ${props.isFocused ? "600px" : unfocusedWidth};
        input {
          padding: ${unfocusedWidth === "0px" && !props.isFocused
            ? "10px 0px"
            : "10px"};
        }
        @media (min-width: 992px) {
          transition: width 0.5s ease-in-out;
        }
        @media (max-width: 992px) {
          width: ${props.isFocused ? "calc(100vw - 165px)" : "144px"};
        }
      `}
      value={props.value}
      data-cy="search-field"
      onChange={(e) => props.setValue(e.target.value)}
      placeholder={get(props.cmsData, "general.search", "Search")}
      endAdornment={
        <div
          css={`
            right: -2px;
            width: 36px;
            height: 36px;
            filter: drop-shadow(0px 1px 8px rgba(0, 0, 0, 0.12));
            display: ${unfocusedWidth === "0px" && !props.isFocused
              ? "none"
              : "flex"};
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
      onFocus={() => props.setIsFocused(true)}
      onBlur={() => {
        if (props.onBlur) {
          props.onBlur();
        }
      }}
    />
  );
};
