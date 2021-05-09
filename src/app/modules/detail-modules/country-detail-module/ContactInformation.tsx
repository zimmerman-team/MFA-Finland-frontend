import { contactInformation } from "app/modules/detail-modules/country-detail-module/mock";
import React from "react";
import { css } from "styled-components/macro";

export const ContactInformation = () => {
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

  const embassy = getEmbassy();
  const department = getDepartment();

  function getEmbassy() {
    return contactInformation.contactInfos.find((item) => {
      return (
        item.title.toLowerCase() === "suomen suurlähetystö" ||
        item.title.toLowerCase() === "embassy of finland"
      );
    });
  }

  function getDepartment() {
    return contactInformation.contactInfos.find((item) => {
      return item.type === "YKSIKKO";
    });
  }

  return (
    <ul css={styles}>
      <li>
        <span>Embassy:</span>
        <span>
          {embassy?.title}, {embassy?.reportName}
        </span>
        <a href={embassy?.link}>Contact information</a>
      </li>

      <li>
        <span>MFA department:</span> <span>{department?.title}</span>
        <a href={department?.link}>Contact information</a>
      </li>
    </ul>
  );
};
