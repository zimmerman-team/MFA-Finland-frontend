import { formatLocale } from "app/utils/formatLocale";
import { SunburstPoint } from "react-vis";

export function getTotal(node: SunburstPoint): string {
  if (node.size) {
    return formatLocale(node.size);
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
  return formatLocale(total);
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
