import ApplicationCard from "./applicationcard";
import { type ApplicationArray } from "~/lib/types";

export default function ApplicationList({
  applications = [],
}: {
  applications: ApplicationArray | undefined;
}) {
  if (!applications) {
    return <></>;
  }

  return (
    <>
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
    </>
  );
}
