import { auth, signIn, signOut } from "~/server/auth";

export default async function TopNav() {
  const session = await auth();

  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Applications</div>
      {session ? (
        <button
          onClick={async () => {
            "use server";
            await signOut();
          }}
        >
          Sign out
        </button>
      ) : (
        <button
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
