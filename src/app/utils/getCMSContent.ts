import get from "lodash/get";

export function getCMSContent(
  cms: any,
  path: string,
  placeholder = `No content in CMS found, item: ${path}`
) {
  const content = get(cms, path, placeholder);
  if (content) return content;
  return placeholder;
}
