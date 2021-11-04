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

      span:first-of-type {
        font-weight: bold;
      }

      span:last-of-type {
        font-size: 14px;
      }
    }

    li:first-of-type {
      margin-bottom: 32px;
    }

    a {
      font-size: 12px;
      text-decoration: underline;

      :hover {
        opacity: 0.6;
      }
    }
  `;

  return (
    <ul css={styles}>
      <li>
        <span>{props.data.title}</span>
        <a href={props.data.link} target="_blank" rel="noreferrer">
          {props.data.link}
        </a>
        <a href={`mailto:${props.data.email}`} target="_blank" rel="noreferrer">
          {props.data.email}
        </a>
      </li>
    </ul>
  );
};
