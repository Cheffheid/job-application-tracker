import { getSpecialApplicationList } from "~/server/queries";
import { isSpecialUser } from "../actions";
import ApplicationCard from "./applicationcard";

export default async function SpecialApplicationsList() {
  if (!(await isSpecialUser())) {
    return <></>;
  }

  const specialapplications = await getSpecialApplicationList();

  return (
    <div className="py-4">
      <h2 className="text-2xl font-semibold">Jeff&lsquo;s Application List</h2>
      <div className="grid gap-4 py-4 sm:grid-cols-2 lg:grid-cols-4">
        {specialapplications.map((application) => (
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
