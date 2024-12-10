import { auth, signIn, signOut } from "~/server/auth";

export default async function TopNav() {
  const session = await auth();

  return (
    <header className="drop-shadow-1 top-0 flex w-full">
      <nav className="shadow-2 flex flex-grow items-center justify-end px-4 py-4 md:px-6 2xl:px-11">
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
