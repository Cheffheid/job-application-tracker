import React from "react";

interface StatusBadgeProps {
  status: string;
  readonly children: React.ReactNode;
}

export default function StatusBadge({ status, children }: StatusBadgeProps) {
  const statusColors = {
    interviewed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
  };
  const badgeClasses = `inline-flex items-center rounded-md border border-transparent px-2.5 py-0.5 text-xs font-semibold ${statusColors[status as keyof typeof statusColors]}`;

  return <div className={badgeClasses}>{children}</div>;
}
