import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const applications = await db.query.application.findMany();

  return (
    <main className="">
      <div className="mx-auto max-w-7xl pt-4">
        <Link href="/dashboard/add">Add New</Link>
        <div className="grid grid-cols-4 gap-4 py-4">
          {applications.map((application) => (
            <div
              key={application.id}
              className="w-full bg-white p-4 text-black"
            >
              <h2 className="font-semibold">{application.role}</h2>
              <p>
                {application.company} &bull; {application.appliedAt} &bull;{" "}
                {application.status}
              </p>
              <div className="flex gap-1">
                <button>delete</button>
                <button>edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
