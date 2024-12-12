import ApplicationCard from "./_components/applicationcard";
import DemoBanner from "./_components/demobanner";
import { getApplications } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const applications = await getApplications();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-4">
      <h2 className="text-2xl font-semibold">Application List</h2>
      <DemoBanner></DemoBanner>
      <div className="grid gap-4 py-4 sm:grid-cols-2 lg:grid-cols-4">
        {applications.map((application) => (
          <ApplicationCard
            key={application.id}
            role={application.role}
            company={application.company}
            status={application.status}
            appliedAt={application.appliedAt}
            descriptionUrl={application.descriptionUrl}
          ></ApplicationCard>
        ))}
      </div>
    </div>
  );
}
