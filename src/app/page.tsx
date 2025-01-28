import Link from "next/link";
import DemoBanner from "@components/demobanner";
import SpecialApplicationsList from "@components/applications/specialapplicationlist";
import ApplicationList from "@components/applications/applicationlists";
import { statusTypes } from "~/server/db/schema";

import { getApplications } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const applications = await getApplications();

  let hasApplications = false;

  statusTypes.forEach((status) => {
    if (!applications.has(status)) {
      return;
    }

    const status_applications = applications.get(status);

    if (status_applications && status_applications.length > 0) {
      hasApplications = true;
    }
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-4">
      <SpecialApplicationsList></SpecialApplicationsList>
      <h2 className="text-2xl font-semibold">Your Applications</h2>
      <DemoBanner></DemoBanner>
      {!hasApplications && (
        <p>
          You have not added any applications yet! Go ahead and{" "}
          <Link href="/application/add" className="underline">
            create some
          </Link>
          .
        </p>
      )}
      {statusTypes.map((status) => {
        return (
          <div key={status} className="py-4">
            <h3 className="text-xl font-semibold capitalize">{status}</h3>
            <div className="grid gap-4 py-4 sm:grid-cols-2 lg:grid-cols-4">
              <ApplicationList applications={applications.get(status)} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
