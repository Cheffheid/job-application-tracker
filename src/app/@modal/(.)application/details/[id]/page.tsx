import { Modal } from "~/app/_components/modal";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { application } from "~/server/db/schema";
import StatusBadge from "~/app/_components/statusbadge";
import Link from "next/link";

export default async function ApplicationDetailsModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const applicationId = (await params).id;
  const idAsNumber = Number(applicationId);

  if (Number.isNaN(idAsNumber)) {
    throw new Error("Invalid Application ID");
  }

  const applicationData = await db.query.application.findFirst({
    columns: {
      createdAt: false,
    },
    where: eq(application.id, idAsNumber),
  });

  if (!applicationData) {
    throw new Error("No Application Found With That ID");
  }

  return (
    <Modal title={applicationData.role}>
      <div className="min-w-96 bg-white px-4 pb-4 text-black">
        <div className="py-1">
          <h3 className="text-xl font-bold">
            <Link href={applicationData.descriptionUrl}>
              {applicationData.company}
            </Link>
          </h3>
          {applicationData.applicationStatus && (
            <StatusBadge status={applicationData.applicationStatus}>
              {applicationData.applicationStatus}
            </StatusBadge>
          )}
        </div>
        <div className="py-1">
          {applicationData.secondaryStatus && (
            <p>{applicationData.secondaryStatus}</p>
          )}
          {applicationData.statusUrl && (
            <p>
              <Link href={applicationData.statusUrl}>
                External status system
              </Link>
            </p>
          )}
        </div>
        {applicationData.updatedAt && (
          <div className="text-xs">
            Last Updated:{" "}
            {applicationData.updatedAt.toLocaleDateString("en-US")}
          </div>
        )}
      </div>
    </Modal>
  );
}
