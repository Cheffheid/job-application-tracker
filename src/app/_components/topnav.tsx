import { auth, signIn, signOut } from "~/server/auth";
import { SidebarTrigger } from "~/components/ui/sidebar";

export default async function TopNav() {
  const session = await auth();

  return (
    <header className="drop-shadow-1 top-0 flex w-full">
      <nav className="shadow-2 flex flex-grow items-center justify-between py-4 pl-1 pr-4 md:pr-6 2xl:pr-11">
        <SidebarTrigger />
        {session ? (
          <button
            className="hover:underline"
            onClick={async () => {
              "use server";
              await signOut();
            }}
          >
            Sign out
          </button>
        ) : (
          <button
            className="hover:underline"
            onClick={async () => {
              "use server";
              await signIn();
            }}
          >
            Sign in
          </button>
        )}
      </nav>
    </header>
  );
}
