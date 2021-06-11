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
    // TODO: fetch data from api
    return contactInformation.contactInfos.find((item) => {
      return item.categories["organization-types"].find((org: string) => {
        return org === "UE";
      });
    });
  }

  function getDepartment() {
    // TODO: fetch data from api
    return contactInformation.contactInfos.find((item) => {
      return item.categories["organization-types"].find((org: string) => {
        return org === "UM";
      });
    });
  }

  return (
    <ul css={styles}>
      <li>
        <span>Embassy:</span>
        {embassy ? (
          <a href={embassy.link}>
            {embassy.reportName ? embassy.reportName : embassy.title}
          </a>
        ) : (
          <span>Information not available</span>
        )}
      </li>

      <li>
        <span>MFA department:</span>{" "}
        {department ? (
          <a href={department.link}>
            {department.reportName ? department.reportName : department.title}
          </a>
        ) : (
          <span>Information not available</span>
        )}
      </li>
    </ul>
  );
};
