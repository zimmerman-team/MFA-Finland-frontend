import get from "lodash/get";

const colNameMap = {
  Name: "general.name",
  Code: "general.code",
  Year: "filters.years",
  Committed: "viz.committed",
  "Other ODA": "viz.otheroda",
  Commitment: "viz.committed",
  Area: "general.thematicareas",
  "Exclusive ODA": "viz.exclusiveoda",
  "Budget line": "general.budgetlines",
  "Budget lines": "general.budgetlines",
  Disbursement: "viz.disbursementsamount",
  Disbursements: "viz.disbursementsamount",
  "Category / DAC3 / DAC5": "viz.sectortablecatcol",
};

export function getTranslatedCols(cols: any, cmsData: any) {
  return cols.map((col: any) => ({
    ...col,
    label: get(cmsData, get(colNameMap, col.label, null), col.label),
  }));
}
