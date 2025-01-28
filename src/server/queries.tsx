import "server-only";
import { db } from "./db";
import { isDemoUser, getUserId, isSpecialUser } from "~/app/actions";
import { statusTypes } from "~/server/db/schema";

import { type ApplicationArray } from "~/lib/types";

type SplitApplicationArray = Map<string, ApplicationArray>;

export async function getApplications() {
  let applications: ApplicationArray = [];
  const [demoUser, specialUser] = await Promise.all([
    isDemoUser(),
    isSpecialUser(),
  ]);

  if (demoUser || specialUser) {
    applications = await getOtherApplications(demoUser, specialUser);
  } else {
    const userId: string = await getUserId();

    applications = await db.query.applications.findMany({
      where: (applications, { eq }) => eq(applications.createdBy, userId),
      orderBy: (model, { desc, asc }) => [
        asc(model.applicationStatus),
        desc(model.appliedAt),
        desc(model.createdAt),
      ],
    });
  }

  return organizeApplications(applications);
}

export async function getSpecialApplicationList() {
  let applications: ApplicationArray = [];

  const userId: string = await getMyUserId();

  applications = await db.query.applications.findMany({
    where: (applications, { eq }) => eq(applications.createdBy, userId),
    orderBy: (model, { desc, asc }) => [
      asc(model.applicationStatus),
      desc(model.appliedAt),
      desc(model.createdAt),
    ],
  });

  return applications;
}

async function getMyUserId() {
  const userId = await db.query.users.findFirst({
    columns: {
      id: true,
    },
    where: (users, { eq }) => eq(users.name, "Jeffrey de Wit"),
  });

  return userId ? userId.id : "";
}

export async function getAdminApplicationList() {
  let applications: ApplicationArray = [];

  const userId: string = await getUserId();

  applications = await db.query.applications.findMany({
    where: (applications, { eq }) => eq(applications.createdBy, userId),
    orderBy: (model, { desc }) => [desc(model.createdAt)],
  });

  return applications;
}

export function getDemoApplications(): {
  id: number;
  role: string;
  company: string;
  applicationStatus: string | null;
  appliedAt: string;
  descriptionUrl: string;
}[] {
  return [
    {
      id: 2,
      role: "Software Engineer II",
      company: "Innovatech Labs",
      applicationStatus: "interviewed",
      appliedAt: "2024-11-22",
      descriptionUrl:
        "https://www.innovatechlabs.com/careers/software-engineer-ii",
    },
    {
      id: 5,
      role: "Backend Developer",
      company: "CloudSync Technologies",
      applicationStatus: "interviewed",
      appliedAt: "2024-11-15",
      descriptionUrl: "https://www.cloudsync.io/jobs/backend-developer",
    },
    {
      id: 7,
      role: "DevOps Engineer",
      company: "ScaleUp Systems",
      applicationStatus: "pending",
      appliedAt: "2024-12-07",
      descriptionUrl: "https://www.scaleup.com/jobs/devops-engineer",
    },
    {
      id: 1,
      role: "Frontend Developer",
      company: "TechNova Solutions",
      applicationStatus: "pending",
      appliedAt: "2024-12-05",
      descriptionUrl: "https://www.technova.com/jobs/frontend-developer",
    },
    {
      id: 4,
      role: "UI/UX Designer",
      company: "PixelCraft Studios",
      applicationStatus: "pending",
      appliedAt: "2024-12-01",
      descriptionUrl: "https://www.pixelcraft.com/careers/ui-ux-designer",
    },
    {
      id: 6,
      role: "Mobile App Developer",
      company: "Appfinity Corp.",
      applicationStatus: "rejected",
      appliedAt: "2024-10-30",
      descriptionUrl: "https://www.appfinity.com/jobs/mobile-app-developer",
    },
    {
      id: 3,
      role: "Senior Full Stack Engineer",
      company: "Digital Horizons Inc.",
      applicationStatus: "rejected",
      appliedAt: "2024-11-10",
      descriptionUrl:
        "https://www.digitalhorizons.com/jobs/senior-fullstack-engineer",
    },
  ];
}

function organizeApplications(
  applications: ApplicationArray = [],
): SplitApplicationArray {
  const splitApplications = new Map<string, ApplicationArray>();

  statusTypes.forEach((status) => {
    const filtered_applications = applications.filter(
      (application) => application.applicationStatus === status,
    );

    splitApplications.set(status, filtered_applications);
  });

  return splitApplications;
}

async function getOtherApplications(demo = false, special = false) {
  if (demo) {
    return getDemoApplications();
  }

  if (special) {
    return getSpecialApplicationList();
  }

  return [];
}
