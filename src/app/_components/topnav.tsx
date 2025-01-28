import { signIn } from "~/server/auth";
import { SidebarTrigger } from "~/components/ui/sidebar";
import UserBadge from "./userbadge";
import { type Session } from "next-auth";

export default async function TopNav({ session }: { session: Session | null }) {
  return (
    <header className="drop-shadow-1 top-0 flex w-full">
      <nav className="shadow-2 flex flex-grow items-center justify-between py-4 pl-1 pr-4 md:pr-6 2xl:pr-11">
        <SidebarTrigger />
        {session ? (
          <UserBadge
            name={session.user.name ? session.user.name : ""}
            image={session.user.image ? session.user.image : ""}
          />
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
