import { css } from "styled-components/macro";
import { PrimaryColor } from "app/theme";
import { rssfeed } from "app/modules/detail-modules/country-detail-module/mock";
import React from "react";

export const RssFeed = () => {
  const styles = {
    container: css`
      list-style-type: none;
      padding: 0;
      padding-right: 24px;
      marign: 0;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 3px;
        height: 4px;
        border-radius: 4px;
        background: ${PrimaryColor[2]};
      }

      &::-webkit-scrollbar-track {
        border-radius: 4px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background: ${PrimaryColor[0]};
      }

      ::-webkit-scrollbar-button {
        width: 0;
        height: 0;
        display: none;
      }

      ::-webkit-scrollbar-corner {
        background-color: transparent;
      }

      li {
        display: flex;
        flex-direction: column;
        margin-bottom: 32px;
      }

      span {
        margin-bottom: 4px;
      }

      a {
        text-decoration: underline;
        :hover {
          opacity: 0.6;
        }
      }
    `,
  };

  function getNiceDate(date: string): string {
    const obj = new Date(date);

    return `${obj.getDay()}-${obj.getMonth()}-${obj.getFullYear()}`;
  }

  const items = rssfeed.map((item) => (
    <li>
      <span>{getNiceDate(item.publishDate)}</span>
      <a href={item.link}>{item.title}</a>
    </li>
  ));

  return <ul css={styles.container}>{items}</ul>;
};
