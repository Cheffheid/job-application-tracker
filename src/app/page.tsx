import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const applications = await db.query.application.findMany();

  return (
    <main className="">
      <div className="mx-auto flex max-w-7xl flex-wrap gap-y-4 py-4">
        {applications.map((application) => (
          <div key={application.id} className="w-1/3">
            <h2>{application.role}</h2>
            <p>
              {application.company} &bull; {application.appliedAt} &bull;{" "}
              {application.status}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
