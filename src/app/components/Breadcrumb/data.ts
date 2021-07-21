export type BreadcrumbLinkModel = {
  label: string;
  path?: string;
  cmsKey: string;
};

export interface BreadcrumbProps {
  route: BreadcrumbLinkModel[];
}
