import Link from "next/link";

interface ApplicationCardProps {
  role: string;
  company: string;
  status: "pending" | "interviewed" | "rejected" | null;
  appliedAt: string;
  descriptionUrl: string;
}

export default function ApplicationCard({
  role,
  company,
  status,
  appliedAt,
  descriptionUrl,
}: ApplicationCardProps) {
  const content = (
    <>
      <h3 className="font-semibold sm:overflow-hidden sm:overflow-ellipsis sm:text-nowrap">
        {role}
      </h3>
      <p>{company}</p>
      <p>
        {appliedAt} &bull; {status}
      </p>
    </>
  );

  const sharedClasses = "flex w-full flex-col shadow-sm p-4";

  if ("rejected" === status) {
    return (
      <div className={`${sharedClasses} bg-gray-300 text-red-800`}>
        {content}
      </div>
    );
  }

  return (
    <Link
      href={descriptionUrl}
      target="_blank"
      className={`${sharedClasses} bg-white text-black duration-100 ease-in-out hover:bg-slate-700 hover:text-white`}
    >
      {content}
    </Link>
  );
}
