import Link from "next/link";
import { auth } from "~/server/auth";

async function AdminMenu() {
  const session = await auth();

  if (!session || "write" !== session.user.accessLevel) {
    return;
  }

  return (
    <>
      <h3 className="mb-4 ml-4 text-sm font-semibold text-textSidebar">
        Admin
      </h3>
      <ul className="mb-6 flex flex-col gap-1.5">
        <li>
          <Link
            href="/application/add"
            className="false group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-textSidebar duration-300 ease-in-out hover:bg-hoverSidebar focus:bg-hoverSidebar"
          >
            Add New
          </Link>
        </li>
      </ul>
    </>
  );
}

export default function Sidebar() {
  return (
    <aside className="z-9999 absolute left-0 top-0 flex h-screen w-60 -translate-x-full flex-col overflow-y-hidden bg-slate-900 duration-300 ease-linear lg:static lg:translate-x-0">
      <div className="flex items-center justify-between gap-2 p-5 lg:p-6">
        <h1 className="font-bold text-white">Job Application Tracker</h1>
      </div>
      <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
        <h2 className="sr-only">Sidebar</h2>
        <h3 className="mb-4 ml-4 text-sm font-semibold text-textSidebar">
          Main
        </h3>
        <ul className="mb-6 flex flex-col gap-1.5">
          <li>
            <Link
              href="/"
              className="false group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-textSidebar duration-300 ease-in-out hover:bg-hoverSidebar focus:bg-hoverSidebar"
            >
              Applications
            </Link>
          </li>
        </ul>
        <AdminMenu></AdminMenu>
      </nav>
    </aside>
  );
}
