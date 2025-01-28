import { getSpecialApplicationList } from "~/server/queries";
import { isSpecialUser } from "~/app/actions";
import ApplicationList from "@components/applications/applicationlists";
import { statusTypes } from "~/server/db/schema";

export default async function SpecialApplicationsList() {
  if (!(await isSpecialUser())) {
    return <></>;
  }

  const specialapplications = await getSpecialApplicationList();

  return (
    <div className="py-4">
      <h2 className="text-2xl font-semibold">Jeff&lsquo;s Application List</h2>
      {statusTypes.map((status) => {
        return (
          <div key={status} className="py-4">
            <h3 className="text-xl font-semibold capitalize">{status}</h3>
            <div className="grid gap-4 py-4 sm:grid-cols-2 lg:grid-cols-4">
              <ApplicationList applications={specialapplications.get(status)} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
