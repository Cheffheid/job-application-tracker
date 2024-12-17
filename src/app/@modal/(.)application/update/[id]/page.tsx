import { Modal } from "./modal";

export default async function ApplicationModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const applicationId = (await params).id;
  return <Modal>{applicationId}</Modal>;
}
