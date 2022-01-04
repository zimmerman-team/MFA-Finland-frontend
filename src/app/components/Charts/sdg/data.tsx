export interface SDGvizItemProps {
  name: string;
  name_se: string;
  name_fi: string;
  number: number;
  icon: string;
  icon_se: string;
  icon_fi: string;
  disabled?: boolean;
  disbursed: number;
  committed: number;
}

export interface SDGvizProps {
  containerId?: string;
  data: SDGvizItemProps[];
}

export function mockData(
  currentLanguage: string
): (
  | {
      number: number;
      committed: number;
      disbursed: number;
      name: string;
      icon: string;
      disabled: boolean;
    }
  | {
      number: number;
      committed: number;
      disbursed: number;
      name: string;
      icon: string;
      disabled: boolean;
    }
  | {
      number: number;
      committed: number;
      disbursed: number;
      name: string;
      icon: string;
      disabled: boolean;
    }
  | {
      number: number;
      committed: number;
      disbursed: number;
      name: string;
      icon: string;
      disabled: boolean;
    }
  | {
      number: number;
      committed: number;
      disbursed: number;
      name: string;
      icon: string;
      disabled: boolean;
    }
  | {
      number: number;
      committed: number;
      disbursed: number;
      name: string;
      icon: string;
      disabled: boolean;
    }
  | {
      number: number;
      committed: number;
      disbursed: number;
      name: string;
      icon: string;
      disabled: boolean;
    }
  | {
      number: number;
      committed: number;
      disbursed: number;
      name: string;
      icon: string;
      disabled: boolean;
    }
  | {
      number: number;
      committed: number;
      disbursed: number;
      name: string;
      icon: string;
      disabled: boolean;
    }
  | {
      number: number;
      committed: number;
      disbursed: number;
      name: string;
      icon: string;
      disabled: boolean;
    }
  | {
      number: number;
      committed: number;
      disbursed: number;
      name: string;
      icon: string;
      disabled: boolean;
    }
  | {
      number: number;
      committed: number;
      disbursed: number;
      name: string;
      icon: string;
      disabled: boolean;
    }
  | {
      number: number;
      committed: number;
      disbursed: number;
      name: string;
      icon: string;
      disabled: boolean;
    }
  | {
      number: number;
      committed: number;
      disbursed: number;
      name: string;
      icon: string;
      disabled: boolean;
    }
  | {
      number: number;
      committed: number;
      disbursed: number;
      name: string;
      icon: string;
      disabled: boolean;
    }
  | {
      number: number;
      committed: number;
      disbursed: number;
      name: string;
      icon: string;
      disabled: boolean;
    }
  | {
      number: number;
      committed: number;
      disbursed: number;
      name: string;
      icon: string;
      disabled: boolean;
    }
)[] {
  return [
    {
      committed: 34325000,
      disbursed: 22397000,
      name: "Goal 1. End poverty in all its forms everywhere",
      icon: `/sdgs/${currentLanguage === "se" ? "sv" : currentLanguage}/1.png`,
      number: 1,
      disabled: false,
    },
    {
      committed: 198281752,
      disbursed: 90271351.37,
      name:
        "Goal 2. End hunger, achieve food security and improved nutrition and promote sustainable agriculture",
      icon: "/sdgs/2.png",
      number: 2,
      disabled: false,
    },
    {
      committed: 81872269,
      disbursed: 34465704.150000006,
      name:
        "Goal 3. Ensure healthy lives and promote well-being for all at all ages",
      icon: "/sdgs/3.png",
      number: 3,
      disabled: false,
    },
    {
      committed: 102713195,
      disbursed: 78509605.53,
      name:
        "Goal 4. Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all",
      icon: "/sdgs/4.png",
      number: 4,
      disabled: false,
    },
    {
      committed: 152200226,
      disbursed: 104278862.96,
      name: "Goal 5. Achieve gender equality and empower all women and girls",
      icon: "/sdgs/5.png",
      number: 5,
      disabled: false,
    },
    {
      committed: 40948827,
      disbursed: 11078535.04,
      name:
        "Goal 6. Ensure availability and sustainable management of water and sanitation for all",
      icon: "/sdgs/6.png",
      number: 6,
      disabled: false,
    },
    {
      committed: 33900000,
      disbursed: 7489000,
      name:
        "Goal 7. Ensure access to affordable, reliable, sustainable and modern energy for all",
      icon: "/sdgs/7.png",
      number: 7,
      disabled: false,
    },
    {
      committed: 58974394,
      disbursed: 24756367.040000003,
      name:
        "Goal 8. Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all",
      icon: "/sdgs/8.png",
      number: 8,
      disabled: false,
    },
    {
      committed: 43338500,
      disbursed: 14179174.35,
      name:
        "Goal 9. Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation",
      icon: "/sdgs/9.png",
      number: 9,
      disabled: false,
    },
    {
      committed: 50734897,
      disbursed: 11865401.01,
      name: "Goal 10. Reduce inequality within and among countries",
      icon: "/sdgs/10.png",
      number: 10,
      disabled: false,
    },
    {
      committed: 31600000,
      disbursed: 1283080,
      name:
        "Goal 11. Make cities and human settlements inclusive, safe, resilient and sustainable",
      icon: "/sdgs/11.png",
      number: 11,
      disabled: false,
    },
    {
      committed: 8241407,
      disbursed: 1194691.44,
      name: "Goal 12. Ensure sustainable consumption and production patterns",
      icon: "/sdgs/12.png",
      number: 12,
      disabled: false,
    },
    {
      committed: 112577789,
      disbursed: 58672201.04,
      name:
        "Goal 13. Take urgent action to combat climate change and its impacts",
      icon: "/sdgs/13.png",
      number: 13,
      disabled: false,
    },
    {
      committed: 5640132,
      disbursed: 5525586,
      name:
        "Goal 14. Conserve and sustainably use the oceans, seas and marine resources for sustainable development",
      icon: "/sdgs/14.png",
      number: 14,
      disabled: false,
    },
    {
      committed: 6198004,
      disbursed: 5725586,
      name:
        "Goal 15. Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss",
      icon: "/sdgs/15.png",
      number: 15,
      disabled: false,
    },
    {
      committed: 20322428,
      disbursed: 13954900,
      name:
        "Goal 16. Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels",
      icon: "/sdgs/16.png",
      number: 16,
      disabled: false,
    },
    {
      committed: 1938195,
      disbursed: 1960859.26,
      name:
        "Goal 17. Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development",
      icon: "/sdgs/17.png",
      number: 17,
      disabled: false,
    },
  ];
}
