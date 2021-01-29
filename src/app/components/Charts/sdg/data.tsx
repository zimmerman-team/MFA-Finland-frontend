export interface SDGvizItemProps {
  name: string;
  number: number;
  icon: string;
  disabled?: boolean;
  disbursed: number;
  committed: number;
}

export interface SDGvizProps {
  data: SDGvizItemProps[];
}

export const mockData: SDGvizItemProps[] = [
  {
    name: "No poverty",
    number: 1,
    icon: "/sdgs/1.png",
    disbursed: 1000000,
    committed: 1000000,
  },
  {
    name: "Zero hunger",
    number: 2,
    icon: "/sdgs/2.png",
    disabled: true,
    disbursed: 1000000,
    committed: 1000000,
  },
  {
    name: "Good health and well-being",
    number: 3,
    icon: "/sdgs/3.png",
    disabled: true,
    disbursed: 1000000,
    committed: 1000000,
  },
  {
    name: "Quality education",
    number: 4,
    icon: "/sdgs/4.png",
    disbursed: 1000000,
    committed: 1000000,
  },
  {
    name: "Gender equality",
    number: 5,
    icon: "/sdgs/5.png",
    disabled: true,
    disbursed: 1000000,
    committed: 1000000,
  },
  {
    name: "Clean water and sanitation",
    number: 6,
    icon: "/sdgs/6.png",
    disbursed: 1000000,
    committed: 1000000,
  },
  {
    name: "Affordable and clean energy",
    number: 7,
    icon: "/sdgs/7.png",
    disabled: true,
    disbursed: 1000000,
    committed: 1000000,
  },
  {
    name: "Decent work and economic growth",
    number: 8,
    icon: "/sdgs/8.png",
    disbursed: 1000000,
    committed: 1000000,
  },
  {
    name: "Industry, innovation and infrastructure",
    number: 9,
    icon: "/sdgs/9.png",
    disbursed: 1000000,
    committed: 1000000,
  },
  {
    name: "Reduced inequalities",
    number: 10,
    icon: "/sdgs/10.png",
    disabled: true,
    disbursed: 1000000,
    committed: 1000000,
  },
  {
    name: "Sustainable cities and communities",
    number: 11,
    icon: "/sdgs/11.png",
    disbursed: 1000000,
    committed: 1000000,
  },
  {
    name: "Responsible consumption and production",
    number: 12,
    icon: "/sdgs/12.png",
    disabled: true,
    disbursed: 1000000,
    committed: 1000000,
  },
  {
    name: "Climate action",
    number: 13,
    icon: "/sdgs/13.png",
    disbursed: 1000000,
    committed: 1000000,
  },
  {
    name: "Life below water",
    number: 14,
    icon: "/sdgs/14.png",
    disbursed: 1000000,
    committed: 1000000,
  },
  {
    name: "Line on land",
    number: 15,
    icon: "/sdgs/15.png",
    disabled: true,
    disbursed: 1000000,
    committed: 1000000,
  },
  {
    name: "Peace, justice and strong institutions",
    number: 16,
    icon: "/sdgs/16.png",
    disabled: true,
    disbursed: 1000000,
    committed: 1000000,
  },
  {
    name: "Partnerships for the goals",
    number: 17,
    icon: "/sdgs/17.png",
    disabled: true,
    disbursed: 1000000,
    committed: 1000000,
  },
];
