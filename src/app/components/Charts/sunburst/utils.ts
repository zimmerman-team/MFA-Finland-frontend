/* eslint-disable no-param-reassign */
import find from "lodash/find";
import sumBy from "lodash/sumBy";
import filter from "lodash/filter";
import orderBy from "lodash/orderBy";

function convertHexToRGBA(hexCode: string, opacity: number) {
  let hex = hexCode.replace("#", "");

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity})`;
}

function flattenData(data: any) {
  const flatData: any[] = [];
  function traverse(tData: any[]) {
    tData.forEach((item: any) => {
      flatData.push(item);
      if (item.children) {
        traverse(item.children);
      }
    });
  }
  traverse(data.children);
  return flatData;
}

export function getSelectedItemData(selected: string, data: any) {
  if (selected === "") {
    return data;
  }
  const flatData = flattenData(data);
  const filteredData = find(flatData, { title: selected });
  if (filteredData) {
    if (filteredData.children) {
      const diff = filteredData.children
        ? 0.99 / filteredData.children.length
        : 0;
      let result = filteredData.children.map((child: any) => {
        if (child.children && child.size === 0) {
          return {
            ...child,
            size: sumBy(child.children, "size"),
          };
        }
        return child;
      });
      result = filter(
        orderBy(result, "size", "asc"),
        (child: any) => child.size > 0
      ).map((child: any, index: number) => {
        let newChild = {
          ...child,
          color: convertHexToRGBA(child.color, (index + 1) * diff),
        };
        if (child.children) {
          newChild = {
            ...newChild,
            children: orderBy(newChild.children, "size", "desc").map(
              (grandchild: any) => ({
                ...grandchild,
                color: newChild.color,
              })
            ),
          };
        }
        return newChild;
      });
      return { ...filteredData, children: orderBy(result, "size", "desc") };
    }
    return {
      ...filteredData,
      children: [{ ...filteredData, children: [] }],
    };
  }
  return data;
}
