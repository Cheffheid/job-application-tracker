import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const applications = await db.query.application.findMany();

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {applications.map((application) => (
          <div key={application.id} className="w-96 p-4">
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
