import Link from "next/link";
import StatusBadge from "~/app/_components/statusbadge";
import { getAdminApplicationList } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const applications = await getAdminApplicationList();

  return (
    <main className="">
      <div className="mx-auto max-w-7xl py-4">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-50">
              <th scope="col" className="p-2">
                Role
              </th>
              <th scope="col" className="p-2">
                Company
              </th>
              <th scope="col" className="p-2">
                Date
              </th>
              <th scope="col" className="p-2">
                Status
              </th>
              <th scope="col" className="p-2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id} className="odd:bg-white even:bg-gray-50">
                <th scope="row" className="p-2 text-left font-semibold">
                  <a href={application.descriptionUrl}>{application.role}</a>
                </th>
                <td className="p-2">{application.company}</td>
                <td className="p-2">{application.appliedAt}</td>
                <td className="p-2">
                  {application.status && (
                    <StatusBadge status={application.status}>
                      {application.status}
                    </StatusBadge>
                  )}
                </td>
                <td className="p-2">
                  <button className="mr-1">delete</button>
                  <Link href={`/application/update/${application.id}`}>
                    edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
