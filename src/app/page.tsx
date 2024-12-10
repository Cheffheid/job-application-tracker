import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const applications = await db.query.application.findMany();

  return (
    <div className="mx-auto max-w-7xl pt-4">
      <h2 className="text-2xl font-semibold">Application List</h2>
      <div className="grid grid-cols-4 gap-4 py-4">
        {applications.map((application) => (
          <div
            key={application.id}
            className="w-full bg-white p-4 text-black shadow-sm"
          >
            <h3 className="font-semibold">{application.role}</h3>
            <p>
              {application.company} &bull; {application.appliedAt} &bull;{" "}
              {application.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
