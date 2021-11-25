import React from "react";
import { css } from "styled-components/macro";

export const ContactInformation = (props: any) => {
  const styles = css`
    list-style-type: none;
    padding: 0;
    margin: 0;
    margin-top: 14px;

    li {
      display: flex;
      flex-direction: column;
      font-size: 16px;
      gap: 8px;
    }

    li:first-of-type {
      margin-bottom: 32px;
    }

    a {
      font-size: 14px;
      word-break: break-all;
      text-decoration: underline;

      :hover {
        opacity: 0.6;
      }
    }
  `;

  return (
    <ul css={styles}>
      <li>
        <a href={props.data.link} target="_blank" rel="noreferrer">
          {props.data.title}
        </a>
      </li>
      <li>
        <a href={props.data.embassy.link} target="_blank" rel="noreferrer">
          {props.data.embassy.title}
        </a>
      </li>
    </ul>
  );
};
