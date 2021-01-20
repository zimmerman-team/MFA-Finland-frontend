import { SunburstPoint } from "react-vis";

export function getTotal(node: SunburstPoint): string {
  if (node.size) {
    return node.size.toLocaleString("de-DE", {
      style: "currency",
      currency: "EUR",
    });
  }
  let total = 0;
  function traverse(cNode: SunburstPoint) {
    if (cNode.children) {
      cNode.children.forEach((child: SunburstPoint) => {
        if (child.size) {
          total += child.size;
        } else if (child.children) {
          traverse(child);
        }
      });
    }
  }
  traverse(node);
  return total.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

export function getFormattedPercentage(value: number): string {
  if (!value) {
    return "";
  }
  if (value > 100) {
    return "(100%)";
  }
  return `(${value.toFixed(2)}%)`;
}
