import React from "react";
import { useRecoilState } from "recoil";
import { css } from "styled-components/macro";
import { languageAtom } from "app/state/recoil/atoms";

export const ContactInformation = (props: any) => {
  const [currentLanguage] = useRecoilState(languageAtom);
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

    li:not(:last-child) {
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
      {props.data.strategy && (
        <li>
          <div
            dangerouslySetInnerHTML={{
              __html: props.data.strategy[currentLanguage] || "",
            }}
          />
        </li>
      )}
    </ul>
  );
};
