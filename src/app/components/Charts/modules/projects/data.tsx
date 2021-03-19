import { ProjectType } from "./index";

const project: ProjectType = {
  code: "",
  title:
    "Project Name: Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and  scrambled it to make a type specimen book. ",
  startDate: "07-12-2020",
  sectors: ["Education"],
  status: "Implementation",
  endDate: "07-12-2020",
  country_region: ["Kenya"],
  budget: 10000000,
  disbursementPercentage: 75,
  cmsData: {},
};

export const projects: ProjectType[] = [
  project,
  project,
  project,
  project,
  project,
  project,
];
