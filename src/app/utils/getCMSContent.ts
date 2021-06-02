import get from "lodash/get";
import { urlify } from "app/utils/urlify";

export function getCMSContent(
  cms: any,
  path: string,
  placeholder = `No content in CMS found, item: ${path}`
) {
  const content = get(cms, path, placeholder);
  // if (isHTML(content)) return content;
  // if (content) return urlify(content);
  if (content) return content;
  return placeholder;
}

function isHTML(s: string) {
  const doc = new DOMParser().parseFromString(s, "text/html");
  return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
}
