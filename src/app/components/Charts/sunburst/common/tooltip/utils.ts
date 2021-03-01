import { SunburstPoint } from "react-vis";
import { formatLocale } from "app/utils/formatLocale";

export function getTotal(
  node: SunburstPoint,
  format?: boolean
): string | number {
  if (node.size) {
    if (format) {
      return formatLocale(node.size);
    }
    return node.size;
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
  if (format) {
    return formatLocale(total);
  }
  return total;
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
