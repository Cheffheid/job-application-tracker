import "server-only";
import { db } from "./db";
import { isDemoUser } from "~/app/actions";

export async function getApplications() {
  let applications = [];

  if (await isDemoUser()) {
    applications = getDummyApplications();
  } else {
    applications = await db.query.application.findMany({
      orderBy: (model, { desc, asc }) => [
        asc(model.status),
        desc(model.appliedAt),
        desc(model.createdAt),
      ],
    });
  }

  return applications;
}

export async function getAdminApplicationList() {
  let applications = [];

  applications = await db.query.application.findMany({
    orderBy: (model, { desc }) => [desc(model.createdAt)],
  });

  return applications;
}

export function getDummyApplications(): {
  id: number;
  role: string;
  company: string;
  status: "pending" | "interviewed" | "rejected" | null;
  appliedAt: string;
  descriptionUrl: string;
}[] {
  return [
    {
      id: 2,
      role: "Software Engineer II",
      company: "Innovatech Labs",
      status: "interviewed",
      appliedAt: "2024-11-22",
      descriptionUrl:
        "https://www.innovatechlabs.com/careers/software-engineer-ii",
    },
    {
      id: 5,
      role: "Backend Developer",
      company: "CloudSync Technologies",
      status: "interviewed",
      appliedAt: "2024-11-15",
      descriptionUrl: "https://www.cloudsync.io/jobs/backend-developer",
    },
    {
      id: 7,
      role: "DevOps Engineer",
      company: "ScaleUp Systems",
      status: "pending",
      appliedAt: "2024-12-07",
      descriptionUrl: "https://www.scaleup.com/jobs/devops-engineer",
    },
    {
      id: 1,
      role: "Frontend Developer",
      company: "TechNova Solutions",
      status: "pending",
      appliedAt: "2024-12-05",
      descriptionUrl: "https://www.technova.com/jobs/frontend-developer",
    },
    {
      id: 4,
      role: "UI/UX Designer",
      company: "PixelCraft Studios",
      status: "pending",
      appliedAt: "2024-12-01",
      descriptionUrl: "https://www.pixelcraft.com/careers/ui-ux-designer",
    },
    {
      id: 6,
      role: "Mobile App Developer",
      company: "Appfinity Corp.",
      status: "rejected",
      appliedAt: "2024-10-30",
      descriptionUrl: "https://www.appfinity.com/jobs/mobile-app-developer",
    },
    {
      id: 3,
      role: "Senior Full Stack Engineer",
      company: "Digital Horizons Inc.",
      status: "rejected",
      appliedAt: "2024-11-10",
      descriptionUrl:
        "https://www.digitalhorizons.com/jobs/senior-fullstack-engineer",
    },
  ];
}
