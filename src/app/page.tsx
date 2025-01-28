import Link from "next/link";
import ApplicationCard from "./_components/applications/applicationcard";
import DemoBanner from "./_components/demobanner";
import { getApplications } from "~/server/queries";
import SpecialApplicationsList from "./_components/applications/specialapplicationlist";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const applications = await getApplications();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-4">
      <SpecialApplicationsList></SpecialApplicationsList>
      <h2 className="text-2xl font-semibold">Your Applications</h2>
      <DemoBanner></DemoBanner>
      {!applications.length && (
        <p>
          You have not added any applications yet! Go ahead and{" "}
          <Link href="/application/add" className="underline">
            create some
          </Link>
          .
        </p>
      )}
      <div className="grid gap-4 py-4 sm:grid-cols-2 lg:grid-cols-4">
        {applications.map((application) => (
          <ApplicationCard
            key={application.id}
            role={application.role}
            company={application.company}
            status={application.applicationStatus}
            appliedAt={application.appliedAt}
            descriptionUrl={application.descriptionUrl}
          ></ApplicationCard>
        ))}
      </div>
    </div>
  );
}
