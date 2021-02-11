import React from "react";
import isEmpty from "lodash/isEmpty";
import { css } from "styled-components/macro";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const nodatacss = css`
  width: 100%;
  padding: 17px 0;
  text-align: center;
  color: rgba(61, 61, 61, 0.6);
`;

const tableheadcss = css`
  && {
    border-style: none;
  }
`;

const tablerowcss = (numberOfCols: number) => css`
  && {
    > td {
      width: calc(100% / ${numberOfCols});
    }
  }
`;

const tabledheadcellcss = css`
  && {
    font-size: 12px;
    font-weight: 400;
    text-transform: capitalize;
    color: rgba(61, 61, 61, 0.6);
  }
`;

const tablebodycell = (isLink: boolean) => css`
  font-size: 14px;
  font-weight: 500;

  color: ${isLink ? "#25a898" : "initial"};
  :hover {
    cursor: ${isLink ? "pointer" : "initial"};
    color: ${isLink ? "#30c2b0" : "initial"};
  }
`;

const listcss = css`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const listitemcss = css`
  width: 100%;
  display: flex;
  padding: 17px 0;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #d7d8d9;

  > div:first-of-type {
    font-size: 12px;
    font-weight: 400;
    text-transform: capitalize;
    color: rgba(61, 61, 61, 0.6);
  }
  > div:nth-of-type(2) {
    color: #2e4063;
    font-size: 14px;
    font-weight: 500;
  }
`;

function getLink(key: string, data: any) {
  let cellData = data;
  let link = "";

  if (key === "email") {
    link = `mailto:${data}`;
  } else if (key === "telephone") {
    link = `tel:${data}`;
  } else if (key === "organisation") {
    link = `/organisation/${cellData.ref}/projects`;
    cellData = data.name;
  } else if (key === "website") {
    link = data;
  }
  if (key === "organisation") {
    return (
      <Link to={`${link}`} target="_blank" rel="noopener noreferrer">
        {cellData}
      </Link>
    );
  }
  return (
    <a href={`${link}`} target="_blank" rel="noopener noreferrer">
      {cellData}
    </a>
  );
}

export function getAccordionContent(data: any, type: string) {
  if (type === "array") {
    if (!data || data.length === 0) {
      return <div css={nodatacss}>No data</div>;
    }
    const rowKeys = Object.keys(data[0]);

    return (
      <Table>
        <TableHead css={tableheadcss}>
          <TableRow css={tablerowcss(rowKeys.length)}>
            {rowKeys.map((key: string) => {
              return key !== "url" ? (
                <TableCell key={`${key}-th-cell`} css={tabledheadcellcss}>
                  {key.replace(/_/g, " ")}
                </TableCell>
              ) : (
                <></>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item: any, index: number) => (
            <TableRow key={`${index}-tr`} css={tablerowcss(rowKeys.length)}>
              {Object.keys(item).map((key: string) => {
                return key !== "url" ? (
                  <TableCell
                    key={`${key}-tb-cell`}
                    css={tablebodycell(
                      "url" in item && Object.values(item)[0] === item[key]
                    )}
                    onClick={() =>
                      "url" in item && Object.values(item)[0] === item[key]
                        ? window.open(window.location.origin + item["url"])
                        : null
                    }
                  >
                    {item[key]}
                  </TableCell>
                ) : (
                  <></>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  if (type === "object") {
    if (!data || isEmpty(data)) {
      return <div css={nodatacss}>No data</div>;
    }
    return (
      <div css={listcss}>
        {Object.keys(data).map((key: string) => (
          <div key={`${key}-ls-cell`} css={listitemcss}>
            <div>{key.replace(/_/g, " ")}</div>
            <div>
              {key === "email" ||
              key === "telephone" ||
              key === "website" ||
              key === "organisation"
                ? getLink(key, data[key])
                : data[key]}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return <div css={nodatacss}>{data || "No data"}</div>;
}
