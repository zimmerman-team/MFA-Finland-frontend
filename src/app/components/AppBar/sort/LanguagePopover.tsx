import React from "react";
import { Popover } from "@material-ui/core";
import { css } from "styled-components/macro";

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
  const removeButtonStyling = css`
    background: none;
    color: inherit;
    border: none;
    padding: 8px 24px;
    font: inherit;
    cursor: pointer;

    font-family: Finlandica;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.15px;
    color: #002561;

    :hover {
      background-color: #ecf1fa;
    }
  `;

  const popover = css`
    .MuiPaper-root {
      box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.12);
      border-radius: 10px;
    }
  `;

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
      css={popover}
    >
      <div
        css={`
          display: flex;
          flex-direction: column;
          background-color: white;
          //padding: 16px;
          padding: 22px 0;

          div {
            user-select: none;
            cursor: pointer;
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
        <button
          type="button"
          css={removeButtonStyling}
          aria-label="Switch language to Finnish"
          onClick={() => {
            setLanguage("en");
            handleClose();
          }}
        >
          English
        </button>
        <button
          type="button"
          css={removeButtonStyling}
          aria-label="Switch language to Finnish"
          onClick={() => {
            setLanguage("fi");
            handleClose();
          }}
        >
          Suomi [Finnish]
        </button>
        <button
          type="button"
          css={removeButtonStyling}
          aria-label="Switch language to Swedish"
          onClick={() => {
            setLanguage("se");
            handleClose();
          }}
        >
          Svenska [Swedish]
        </button>
      </div>
    </Popover>
  );
}
