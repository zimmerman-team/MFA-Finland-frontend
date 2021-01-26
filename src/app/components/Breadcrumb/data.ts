export type BreadcrumbLinkModel = {
  label: string;
  path?: string;
};

export interface BreadcrumbProps {
  route: BreadcrumbLinkModel[];
}
