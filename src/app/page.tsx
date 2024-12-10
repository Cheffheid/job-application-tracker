import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const applications = await db.query.application.findMany();

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-4 gap-4 py-4">
      {applications.map((application) => (
        <div
          key={application.id}
          className="w-full bg-white p-4 text-black shadow-sm"
        >
          <h2 className="font-semibold">{application.role}</h2>
          <p>
            {application.company} &bull; {application.appliedAt} &bull;{" "}
            {application.status}
          </p>
        </div>
      ))}
    </div>
  );
}
