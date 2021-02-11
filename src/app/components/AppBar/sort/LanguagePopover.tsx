import React from "react";
import { Popover } from "@material-ui/core";

export function LanguagePopover(
  id: string | undefined,
  open: boolean,
  anchorEl: HTMLButtonElement | null,
  handleClose: () => void,
  setLanguage: {
    (valOrUpdater: string | ((currVal: string) => string)): void;
    (arg0: string): void;
  }
) {
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <div
        css={`
          display: flex;
          flex-direction: column;
          background-color: white;
          padding: 16px;

          div {
            user-select: none;
            cursor: pointer;
            text-transform: uppercase;
            margin-bottom: 16px;

            &:hover {
              opacity: 0.5;
            }

            &:last-child {
              margin-bottom: 0;
            }
          }
        `}
      >
        <div
          onClick={() => {
            setLanguage("fi");
          }}
        >
          fi
        </div>
        <div
          onClick={() => {
            setLanguage("sv");
          }}
        >
          sv
        </div>
        <div
          onClick={() => {
            setLanguage("en");
          }}
        >
          en
        </div>
      </div>
    </Popover>
  );
}
