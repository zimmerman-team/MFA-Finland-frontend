import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";

export interface GenericPageModuleProps {
  helmetTitle: string;
  cards: {
    title: string;
    content: string;
    faqItems?: { items: { title: string; paragraph: string }[] };
  }[];
  breadcrumbs: BreadcrumbLinkModel[];
}
