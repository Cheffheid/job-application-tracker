import UpdateForm from "~/app/_components/forms/update-form";
import { Modal } from "~/app/_components/modal";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { application } from "~/server/db/schema";

export default async function ApplicationModal({
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
      updatedAt: false,
      createdAt: false,
    },
    where: eq(application.id, idAsNumber),
  });

  if (!applicationData) {
    throw new Error("No Application Found With That ID");
  }

  return (
    <Modal title="Update Application">
      <UpdateForm application={applicationData} />
    </Modal>
  );
}
