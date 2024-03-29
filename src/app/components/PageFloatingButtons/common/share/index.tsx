import React from "react";
import { css } from "styled-components/macro";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from "react-share";
import { Typography } from "@material-ui/core";
import get from "lodash/get";

const containercss = css`
  padding: 8px;
  width: 250px;
  display: flex;
  color: #002561;
  font-size: 14px;
  background: #fff;
  flex-direction: column;
`;

const iconscontainercss = css`
  gap: 12px;
  display: flex;
  margin-top: 12px;
  flex-direction: row;
`;

export function ShareTooltip(cmsData: any) {
  const url = window.location.href;
  return (
    <div css={containercss}>
      <Typography variant="body2">
        {get(cmsData.cmsData, "tooltips.share_button", "Share the link via")}
      </Typography>
      <div css={iconscontainercss}>
        <FacebookShareButton
          type="button"
          autoFocus
          url={url}
          quote="OpenAid.fi"
        >
          <FacebookIcon size={38} round />
        </FacebookShareButton>

        <LinkedinShareButton type="button" url={url} title="OpenAid.fi">
          <LinkedinIcon size={38} round />
        </LinkedinShareButton>

        <TwitterShareButton type="button" url={url} title="#OpenAidFi">
          <TwitterIcon size={38} round />
        </TwitterShareButton>
      </div>
    </div>
  );
}
