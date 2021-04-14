import filter from "lodash/filter";
import { CommonPropTypes } from "react-csv/components/CommonPropTypes";

export function vizDataToCSV(data: any, viz: string): CommonPropTypes {
  const csvData: any[] = [];
  switch (viz) {
    case "oda":
      return {
        data,
        filename: "oda",
        headers: [
          { label: "Year", key: "year" },
          { label: "Exclusive", key: "exclusive" },
          { label: "Other", key: "other" },
          { label: "GNI", key: "gni" },
        ],
      };
    // case "oda-drilldown":
    case "thematic-areas":
      return {
        data: data.map((d: any) => ({
          name: d.name,
          area: d.area,
          disbursement: d.value,
          primary: d.primary.value,
          secondary: d.secondary.value,
        })),
        filename: "thematic-areas.csv",
        headers: [
          { label: "Name", key: "name" },
          { label: "Area", key: "area" },
          { label: "Disbursement (EUR)", key: "disbursement" },
          { label: "Primary (EUR)", key: "primary" },
          { label: "Secondary (EUR)", key: "secondary" },
        ],
      };
    case "sectors":
      data.children.forEach((d: any) => {
        csvData.push({
          code: d.code,
          name: d.title,
          disbursement: d.size,
          commitment: d.committed,
        });
        if (d.children) {
          d.children.forEach((c: any) => {
            csvData.push({
              code: c.code,
              name: c.title,
              disbursement: c.size,
              commitment: c.committed,
            });
            if (c.children) {
              c.children.forEach((cc: any) => {
                csvData.push({
                  code: cc.code,
                  name: cc.title,
                  disbursement: cc.size,
                  commitment: cc.committed,
                });
              });
            }
          });
        }
      });
      return {
        data: csvData,
        filename: "sectors.csv",
        headers: [
          { label: "Code", key: "code" },
          { label: "Name", key: "name" },
          { label: "Disbursement", key: "disbursement" },
          { label: "Commitment", key: "commitment" },
        ],
      };
    case "countries-regions":
      data.children.forEach((d: any) => {
        csvData.push({
          name: d.name,
          disbursement: d.value,
          commitment: d.committed,
        });
        if (d.orgs) {
          d.orgs.forEach((c: any) => {
            csvData.push({
              name: c.name,
              disbursement: c.value,
              commitment: c.committed,
            });
          });
        }
      });
      return {
        data: csvData,
        filename: "countries-regions.csv",
        headers: [
          { label: "Name", key: "name" },
          { label: "Disbursement", key: "disbursement" },
          { label: "Commitment", key: "commitment" },
        ],
      };
    case "organisations":
      data.children.forEach((d: any) => {
        if (d.orgs) {
          d.orgs.forEach((c: any) => {
            csvData.push({
              name: c.name,
              type: d.name,
              disbursement: c.value,
              commitment: c.committed,
            });
          });
        }
      });
      return {
        data: csvData,
        filename: "organisations.csv",
        headers: [
          { label: "Name", key: "name" },
          { label: "Org type", key: "type" },
          { label: "Disbursement", key: "disbursement" },
          { label: "Commitment", key: "commitment" },
        ],
      };
    case "budget-lines":
      data.forEach((d: any) => {
        const items = filter(
          Object.keys(d),
          (k: string) =>
            k.indexOf("Code") === -1 &&
            k.indexOf("Color") === -1 &&
            k !== "year"
        );
        items.forEach((item: string) => {
          csvData.push({
            name: item,
            year: d.year,
            disbursement: d[item],
          });
        });
      });
      return {
        data: csvData,
        filename: "budget-lines.csv",
        headers: [
          { label: "Budget line", key: "name" },
          { label: "Year", key: "year" },
          { label: "Disbursement", key: "disbursement" },
        ],
      };
    default:
      return {
        data: [],
      };
  }
}
