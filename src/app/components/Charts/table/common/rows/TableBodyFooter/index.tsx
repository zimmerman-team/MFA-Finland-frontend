import React from "react";
import { css } from "styled-components/macro";
import {
  TableCell,
  TableFooter,
  TableRow,
  Typography,
} from "@material-ui/core";
import { SelectableRows } from "mui-datatables";

export interface TableBodyFooterProps {
  options: { columns: any[]; data: any[]; selectableRows: SelectableRows };
}

export const TableBodyFooter = (props: TableBodyFooterProps) => {
  const styles = {
    cell: css`
      background-color: #2e4982;
      height: 56px;
    `,
    typographyContainer: css`
      display: flex;
    `,
    bar: css`
      padding: 0;
      height: 16px;
      background-color: #bcc6d6;
    `,
  };

  const typographyStyle = (marginRight: number) =>
    css`
      color: white !important;
      margin-right: ${marginRight}px;
      font-size: 14px;
    `;

  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={6} css={styles.cell}>
          <div css={styles.typographyContainer}>
            <Typography variant="body2" css={typographyStyle(24)}>
              Commitment type:
            </Typography>
            <Typography variant="body2" css={typographyStyle(110)}>
              $000,000,000.00
            </Typography>
            <Typography variant="body2" css={typographyStyle(24)}>
              Disbursement type:
            </Typography>
            <Typography variant="body2" css={typographyStyle(0)}>
              $000,000,000.00
            </Typography>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} css={styles.bar} />
      </TableRow>
    </TableFooter>
  );
};
