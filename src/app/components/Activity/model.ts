/* eslint-disable @typescript-eslint/camelcase */
import { InpageNavItemModel } from "app/components/InPageNavigation/model";
import { atom } from "recoil";

export const navList: InpageNavItemModel[] = [
  {
    label: "What is AIDA?",
    path: "what-is-aida",
  },
  {
    label: "What is the IATI data?",
    path: "what-is-iati",
  },
  {
    label: "What is the Grand Bargain?",
    path: "what-is-the-grand-bargain",
  },
];

export interface ActivityItemProps {
  id?: string;
  index?: number;
  label: string;
  description?: string;
  path: string;
  dataPath: string;
  data?: any;
  dataType: "object" | "array" | "string";
  expanded?: boolean;
  handleClick?: Function;
}

export const activityList: ActivityItemProps[] = [
  {
    id: "budget",
    label: "Budget",
    description: "budget desc",
    path: "budget",
    dataPath: "budgets",
    dataType: "array",
    expanded: false,
  },
  {
    id: "participating_orgs",
    label: "Participating organisations",
    description: "participating_orgs desc",
    path: "participating_orgs",
    dataPath: "participating_orgs",
    dataType: "array",
    expanded: false,
  },
  {
    id: "activity_summary",
    label: "Activity summary",
    description: "activity_summary desc",
    path: "activity_summary",
    dataPath: "summary",
    dataType: "object",
    expanded: false,
  },
  {
    id: "recipient_countries",
    label: "Recipient countries",
    description: "recipient_countries desc",
    path: "recipient_countries",
    dataPath: "countries",
    dataType: "array",
    expanded: false,
  },
  {
    id: "recipient_regions",
    label: "Recipient regions",
    description: "recipient_regions desc",
    path: "recipient_regions",
    dataPath: "regions",
    dataType: "array",
    expanded: false,
  },
  {
    id: "locations",
    label: "Locations",
    description: "locations desc",
    path: "locations",
    dataPath: "locations",
    dataType: "array",
    expanded: false,
  },
  {
    id: "humanitarian_scope",
    label: "Humanitarian scope",
    description: "humanitarian_scope desc",
    path: "humanitarian_scope",
    dataPath: "humanitarian_scope",
    dataType: "array",
    expanded: false,
  },
  {
    id: "sectors",
    label: "Sectors",
    description: "sectors desc",
    path: "sectors",
    dataPath: "sectors",
    dataType: "array",
    expanded: false,
  },
  {
    id: "default_aid_type",
    label: "Default aid type",
    description: "default_aid_type desc",
    path: "default_aid_type",
    dataPath: "default_aid_types",
    dataType: "array",
    expanded: false,
  },
  {
    id: "policy_marker",
    label: "Policy marker",
    description: "policy_marker desc",
    path: "policy_marker",
    dataPath: "policy_markers",
    dataType: "array",
    expanded: false,
  },
  {
    id: "tags",
    label: "Tags",
    description: "tag desc",
    path: "tags",
    dataPath: "tags",
    dataType: "array",
    expanded: false,
  },
  {
    id: "contact_information",
    label: "Contact information",
    description: "contact_information desc",
    path: "contact_information",
    dataPath: "contact_info",
    dataType: "object",
    expanded: false,
  },
  {
    id: "other_identifiers",
    label: "Other identifiers",
    description: "other_identifiers desc",
    path: "other_identifiers",
    dataPath: "other_identifiers",
    dataType: "array",
    expanded: false,
  },
  {
    id: "country_budget_items",
    label: "Country budget items",
    description: "country_budget_items desc",
    path: "country_budget_items",
    dataPath: "country_budget_items",
    dataType: "array",
    expanded: false,
  },
  {
    id: "planned_disbursements",
    label: "Planned disbursements",
    description: "planned_disbursements desc",
    path: "planned_disbursements",
    dataPath: "planned_disbursements",
    dataType: "array",
    expanded: false,
  },
  {
    id: "document_links",
    label: "Document links",
    description: "document_links desc",
    path: "document_links",
    dataPath: "document_links",
    dataType: "array",
    expanded: false,
  },
  {
    id: "related_activities",
    label: "Related activities",
    description: "related_activities desc",
    path: "related_activities",
    dataPath: "related_activities",
    dataType: "array",
    expanded: false,
  },
  {
    id: "legacy_data",
    label: "Legacy data",
    description: "legacy_data desc",
    path: "legacy_data",
    dataPath: "legacy_data",
    dataType: "array",
    expanded: false,
  },
  {
    id: "conditions",
    label: "Conditions - not attached",
    description: "conditions desc",
    path: "conditions",
    dataPath: "conditions",
    dataType: "array",
    expanded: false,
  },
];

interface ActivityPercentField {
  name: string;
  code: string;
  percentage: string;
}

export interface ActivityMetadata {
  iati_identifier: string;
  reporting_org_ref: string;
  reporting_org_narrative: string;
  reporting_org_type: string;
  title: string;
  dates: string[];
  description: string;
  budgets: {
    type: string;
    status: string;
    start: string;
    end: string;
    value: number;
  }[];
  participating_orgs: {
    name: string;
    type: string;
    role: string;
    reference: string;
  }[];
  summary: {
    status: string;
    scope: string;
    collaboration_type: string;
    default_flow_type: string;
    default_finance_type: string;
    default_tied_status: string;
    capital_spend: string;
    planned_start: string;
    actual_start: string;
    planned_end: string;
    actual_end: string;
  };
  countries: ActivityPercentField[];
  regions: ActivityPercentField[];
  locations: {
    text: string;
    // todo: check type from solr
    coordinates: any;
  }[];
  humanitarian_scope: {
    type: string;
    vocabulary: string;
    code: string;
    text: string;
  }[];
  sectors: ActivityPercentField[];
  default_aid_types: {
    name: string;
    code: string;
    vocabulary: string;
  }[];
  policy_markers: {
    name: string;
    code: string;
    significance: string;
    vocabulary_uri: string;
    vocabulary: string;
  }[];
  tags: {
    code: string;
    text: string;
  }[];
  contact_info: {
    type: string;
    telephone: string;
    email: string;
    website: string;
    organisation: string;
    department: string;
    person: string;
    position: string;
    mailing_address: string;
  };
  other_identifiers: {
    code: string;
    text: string;
  }[];
  country_budget_items: {
    vocab_code: string;
    code: string;
    percentage: string;
    text: string;
  }[];
  planned_disbursements: {
    value: string;
    type: string;
    start: string;
    end: string;
    provider: string;
  }[];
  document_links: {
    text: string;
    url: string;
    category: string;
  }[];
  related_activities: {
    ref: string;
    type: string;
  }[];
  legacy_data: {
    name: string;
    value: string;
    iati_equivalent: string;
  }[];
  conditions: {
    text: string;
    type: string;
  }[];
}

export interface ActivityDetailModuleLayoutProps {
  loading?: boolean;
  metadata: ActivityMetadata;
  inTransactions: Array<string[]>;
  outTransactions: Array<string[]>;
}

export const initActivityDetailData: ActivityDetailModuleLayoutProps = {
  metadata: {
    iati_identifier: "",
    reporting_org_ref: "",
    reporting_org_narrative: "",
    reporting_org_type: "",
    title: "",
    dates: ["", ""],
    description: "",
    budgets: [],
    participating_orgs: [],
    summary: {
      status: "",
      scope: "",
      collaboration_type: "",
      default_flow_type: "",
      default_finance_type: "",
      default_tied_status: "",
      capital_spend: "",
      planned_start: "",
      actual_start: "",
      planned_end: "",
      actual_end: "",
    },
    countries: [],
    regions: [],
    locations: [],
    humanitarian_scope: [],
    sectors: [],
    default_aid_types: [],
    policy_markers: [],
    tags: [],
    contact_info: {
      type: "",
      telephone: "",
      email: "",
      website: "",
      organisation: "",
      department: "",
      person: "",
      position: "",
      mailing_address: "",
    },
    other_identifiers: [],
    country_budget_items: [],
    planned_disbursements: [],
    document_links: [],
    related_activities: [],
    legacy_data: [],
    conditions: [],
  },
  inTransactions: [],
  outTransactions: [],
};

export const ActivityAccordionState = atom({
  key: "activityAccordionState", // unique ID (with respect to other atoms/selectors)
  default: activityList,
});
