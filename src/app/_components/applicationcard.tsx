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
  return (
    <Link
      href={descriptionUrl}
      target="_blank"
      className="w-full bg-white p-4 text-black shadow-sm duration-100 ease-in-out hover:bg-slate-700 hover:text-white"
    >
      <h3 className="font-semibold">{role}</h3>
      <p>
        {company} &bull; {appliedAt} &bull; {status}
      </p>
    </Link>
  );
}
