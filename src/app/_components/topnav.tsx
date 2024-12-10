import Link from "next/link";
import { auth, signIn, signOut } from "~/server/auth";

export default async function TopNav() {
  const session = await auth();

  console.log();

  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <Link href="/">Applications</Link>
      {"write" === session?.user.accessLevel && (
        <Link className="ml-auto mr-2" href="/dashboard">
          Dashboard
        </Link>
      )}

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
  );
}
