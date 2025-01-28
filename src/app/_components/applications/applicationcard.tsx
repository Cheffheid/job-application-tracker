import Link from "next/link";
import StatusBadge from "../statusbadge";

interface ApplicationCardProps {
  role: string;
  company: string;
  status: string | null;
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
  const sharedClasses = "flex w-full flex-col shadow-sm p-4";

  if ("rejected" === status) {
    return (
      <div className={`${sharedClasses} bg-white text-red-800 line-through`}>
        <h3 className="font-semibold sm:overflow-hidden sm:overflow-ellipsis sm:text-nowrap">
          {role}
        </h3>
        <p>{company}</p>
        <div>
          {appliedAt} &bull; {status}
        </div>
      </div>
    );
  }

  return (
    <Link
      href={descriptionUrl}
      target="_blank"
      className={`${sharedClasses} bg-white text-black duration-100 ease-in-out hover:bg-slate-700 hover:text-white`}
    >
      <h3 className="font-semibold sm:overflow-hidden sm:overflow-ellipsis sm:text-nowrap">
        {role}
      </h3>
      <p>{company}</p>
      <div>
        {appliedAt} &bull;{" "}
        {status && <StatusBadge status={status}>{status}</StatusBadge>}
      </div>
    </Link>
  );
}
