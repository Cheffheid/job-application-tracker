import "server-only";
import { db } from "./db";

export async function getApplications() {
  const applications = await db.query.application.findMany({
    orderBy: (model, { desc, asc }) => [
      asc(model.status),
      desc(model.appliedAt),
    ],
  });

  return applications;
}
